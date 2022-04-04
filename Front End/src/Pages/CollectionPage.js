/* eslint-disable */
import axios from "axios";
import React, { useEffect,useState } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import { borderRadius } from "@mui/system";


const useStyles = makeStyles({
  
  main: {
    minHeight: "1100px",
    marginTop: "50px",
  },
  inputImage : {
    marginLeft : "0px"
  },
  profileSection : {
    marginTop : "30px",
    marginBottom : "30px"
  },
  subTitle : {
    marginLeft : "100px",
    marginTop : "50px",
    color : "rgb(51, 153, 255)"
  },
  textField : {
    width: "50%",
    marginTop: 20,
    marginBottom :20,
    minHeight : "100px",
    marginLeft: "25%",
    borderRadius : "10px",
    border: "1px solid"

  }
});
  

export default function CollectionPage(){
  const classes = useStyles();
  const [collectionArr, setCollectionArr] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [newCollection, setNewCollection] = useState(0);
  const [collectionPublic, setPublic] = useState(false);

  useEffect(() => {
    getCollectionData();
    //document.title = "User Profile | Booklab";
  }, [newCollection]);

  async function getCollectionData(){

    let userEmail = sessionStorage.getItem("email");
    let userData = await axios({
      method : "get",
      url : "http://localhost:8001/oneuser/" + userEmail,
    });
    let myCollectionsIds = userData.data.collections;

    let res = await axios({
      method : "get",
      url : "http://localhost:8001/myCollections"
    });

    //console.log(res);
    //console.log(res.data);
    let allCollections = res.data;
    let allMycollection = [];
    let publicCollections = [];

    for (let i =0; i<myCollectionsIds.length ; i++){ 
      let curId = myCollectionsIds[i];
      for (let j =0; j <allCollections.length ; j++){
        if (curId == allCollections[j]._id){
          allMycollection.push(allCollections[j]);
        } else if (allCollections[j].public == true){
            publicCollections.push(allCollections[j]);
        }
      }
    }
    setMyCollections(allMycollection);
    setCollectionArr(publicCollections)

  }

  function handlePublic(){
    if (collectionPublic == false){
      setPublic(true);
    } else {
      setPublic(false);
    }
  }
  
  async function addCollection(){
    let res = await axios({
      method : "post",
      url : "http://localhost:8001/collection",
      data : {
        user : sessionStorage.getItem("id"),
        name : document.getElementById("newCollection").value,
        public : collectionPublic
      }
    });
    document.getElementById("newCollection").value = "";
    let tmp = collectionArr;
    tmp.unshift(res.data);
    setCollectionArr(tmp);
    let tmp2 =newCollection;
    tmp2+=1;
    setNewCollection(tmp2);
  }


  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <div className={classes.textField}> 
        <br></br>
          <TextField
            id="newCollection"
            label="Add Collection"
            variant="standard"
            style={{
              width: "40%",
              marginTop : "-10px",
              marginBottom :20,
              marginLeft: "5%",
              marginRight : "5%"
            }}
          />
          Public<Checkbox
          checked = {collectionPublic}
          onClick={()=>handlePublic()}
          />

          <Button 
            variant="contained"
            onClick={() => addCollection()}
            style = {{
              marginLeft : "100px"
            }}
          >New Collection</Button>
        </div>
          
        <h2 className={classes.subTitle}>my Collections</h2>
        <CollectionsCarousel collections = {myCollections}></CollectionsCarousel>


        <h2 className={classes.subTitle}>Popular Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>

        <h2 className={classes.subTitle}>Other Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>


      </div>
    </div>

  );
}