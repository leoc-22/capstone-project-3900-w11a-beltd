/* eslint-disable */

import React, { useState, useEffect } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import RankingItem from "../Components/RankingItem";
import TopBookGrid from "../Components/TopBookGrid";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  RankingDIv: {
    minHeight : "150px",
    marginTop : "50px",
    marginLeft : '20%',
    borderRadius : "10px",
    width: "60%",
    background : "#EDEDED"    
  },
  innerDiv: {
    marginLeft : "20%",
    paddingTop : "10px"
  }
});



export default function LeaderBoard() {
  
  const classes = useStyles();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  
  async function getData(){

    let res = await axios({
      method : "get",
      url : "http://localhost:8001/myGoals",
    })

    let hashTable = [];

    for (let i =0; i < res.data.length; i++){
      var HasCompleted = res.data[i].completed;
      if (HasCompleted == true){
        if (checkUserExists( res.data[i].user, hashTable)){
          incrementCount(res.data[i].user, hashTable);
        } else {
          let userId = res.data[i].user;
          hashTable = [...hashTable, {user : userId, count : 1}];
        }
      }
    }
    hashTable = sortByKey(hashTable, "count")
    setRankings(hashTable);
  }

  function checkUserExists(userId, hashMap){  
    for (let i =0; i < hashMap.length; i++){
      if (userId === hashMap[i].user){
        return true;
      }
    }
    return false; 
  }

  function incrementCount(userId, hashMap){
    for (let i =0; i < hashMap.length; i++){
      if (userId === hashMap[i].user){
        hashMap[i].count +=1;
        return hashMap;
      }
  
    }
  }

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      {rankings.map((item, index) => (
        <RankingItem data = {item} rank = {index+1}></RankingItem>
      ))}
      <br/>
    </div>
  )
}
