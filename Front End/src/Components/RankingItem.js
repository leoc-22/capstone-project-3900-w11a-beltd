/* eslint-disable */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  RankingDIv: {
    minWidth : "800px",
    marginTop : "50px",
    marginLeft : '20%',
    borderRadius : "10px",
    width: "60%",
    background : "#EDEDED",
    alignItems : "center",
    textAlign : "center"
  },
  picture : {
    marginTop : "5px",
    borderRadius : "10px",
    minWidth : "400px"
  },
  Element : {
    paddingTop : "10px",
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
        <h2 className={classes.Element} >{props.rank +". " + name}</h2>
          <Button 
          className={classes.btn} 
          disableRipple
          onClick = {() => goToProfile()}>
            <img className={classes.picture} src = {img} alt = "Profile Img"></img>
          </Button>
          <p >{"Completed " + props.data.count + " Goals"}</p>
          <br/>
    </div>
  )
}
