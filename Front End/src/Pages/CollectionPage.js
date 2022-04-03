/* eslint-disable */
import axios from "axios";
import React, { useEffect,useState } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


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
    width: "400px",
    marginTop: 20,
    marginBottom :20,
    marginLeft: "20%",
  }
});
  

export default function CollectionPage(){
  const classes = useStyles();
  const [collectionArr, setCollectionArr] = useState([]);
  const [newCollection, setNewCollection] = useState(0);

  useEffect(() => {
    getCollectionData();
    //document.title = "User Profile | Booklab";
  }, []);

  async function getCollectionData(){
    let res = await axios({
      method : "get",
      url : "http://localhost:8001/myCollections"
    });
    //console.log(res.data);
    setCollectionArr(res.data);
  }

  
  async function addCollection(){
    let res = await axios({
      method : "post",
      url : "http://localhost:8001/collection",
      data : {
        user : sessionStorage.getItem("id"),
        name : document.getElementById("newCollection").value,
        public : true
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
          <TextField
            id="newCollection"
            label="Add Collection"
            variant="standard"
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom :20,
              marginLeft: "0%",
            }}
          />
          <Button 
            variant="contained"
            onClick={() => addCollection()}
          >New Collection</Button>
        </div>
          
        <h2 className={classes.subTitle}>my Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>


        <h2 className={classes.subTitle}>Popular Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>

        <h2 className={classes.subTitle}>Other Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>


      </div>
    </div>

  );
}