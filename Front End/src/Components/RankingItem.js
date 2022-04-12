/* eslint-disable */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  RankingDIv: {
    minHeight : "150px",
    maxHeight : "150px",
    minWidth : "800px",
    marginTop : "50px",
    marginLeft : '10%',
    borderRadius : "10px",
    width: "80%",
    background : "#EDEDED"    
  },
  innerDiv: {
    marginLeft : "10%",
    paddingTop : "10px",

  },
  picture : {
    marginTop : "5px",
    minWidth : "200px",
    maxWidth : "200px",
    borderRadius : "10px",
  },
  inlineElement : {
    paddingTop : "50px",
    display: "inline",
    marginLeft : "50px",
    verticalAlign : "top"
  },
  completedText : {
    display: "inline",
    marginLeft : "60px",
    verticalAlign : "top",
  },
  btn : {
        minWidth : "200px",
    maxWidth : "200px",

  }
});
export default function RankingItem(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const history = useHistory();

  const classes = useStyles();  

  useEffect(() => {
    getUserFromId(props.data.user);
  }, []);

  async function getUserFromId(userId){
    let res = await axios({
      method : "get",
      url : "http://localhost:8001/users",
    })

    for (let i =0 ; i< res.data.length ; i++){
      if (userId === res.data[i]._id){
        setImg(res.data[i].image);
        setName(res.data[i].name);
      }
    }
  }
  function goToProfile(){
    history.push("PublicProfiles?id=" + props.data.user);
    return;
  }

  return (
    <div className={classes.RankingDIv}>
      <div className={classes.innerDiv}>
          <Button 
          className={classes.btn} 
          disableRipple
          onClick = {() => goToProfile()}>
            <img className={classes.picture} src = {img} alt = "Profile Img"></img>
          </Button>
          <h2 className={classes.inlineElement} >{props.rank +". " + name}</h2>
          <h2 className={classes.completedText} >{"Completed " + props.data.count + " Goals"}</h2>
      </div>
    </div>
  )
}
