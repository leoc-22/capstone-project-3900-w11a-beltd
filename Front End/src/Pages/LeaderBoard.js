/* eslint-disable */

import React, { useState, useEffect } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import RankingItem from "../Components/RankingItem";
import axios from "axios";
import Button from "@mui/material/Button";

export default function LeaderBoard() {  
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

    let res2 = await axios({
      method : "get",
      url : "http://localhost:8001/users",
    })
    console.log(res2.data);
    for (let i =0; i <res2.data.length ; i++){
      if (checkUserExists(res2.data[i]._id, hashTable) == false){
        let userId = res2.data[i]._id;
        hashTable = [...hashTable, {user : userId, count : 0}];
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
      <AuthenticatedNavbar />
      {rankings.map((item, index) => (
        <RankingItem data = {item} rank = {index+1}></RankingItem>
      ))}
      <br/>
    </div>
  )
}
