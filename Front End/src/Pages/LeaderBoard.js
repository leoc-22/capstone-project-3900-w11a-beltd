import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import RankingItem from "../Components/RankingItem";
import axios from "axios";

const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    margin: "100px auto",
  },
});

export default function LeaderBoard() {
  const classes = useStyles();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    getData();
    document.title = "Leaderboard | Booklab";
  }, []);

  // get leaderboard data
  async function getData() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myGoals",
    });
    let hashTable = [];
    for (let i = 0; i < res.data.length; i++) {
      var HasCompleted = res.data[i].completed;
      if (HasCompleted == true) {
        if (checkUserExists(res.data[i].user, hashTable)) {
          incrementCount(res.data[i].user, hashTable);
        } else {
          let userId = res.data[i].user;
          hashTable = [...hashTable, { user: userId, count: 1 }];
        }
      }
    }

    let res2 = await axios({
      method: "get",
      url: "http://localhost:8001/users",
    });
    for (let i = 0; i < res2.data.length; i++) {
      if (checkUserExists(res2.data[i]._id, hashTable) == false) {
        let userId = res2.data[i]._id;
        hashTable = [...hashTable, { user: userId, count: 0 }];
      }
    }
    hashTable = sortByKey(hashTable, "count");
    setRankings(hashTable);
  }

  // check if user exists in the hashmap
  function checkUserExists(userId, hashMap) {
    for (let i = 0; i < hashMap.length; i++) {
      if (userId === hashMap[i].user) {
        return true;
      }
    }
    return false;
  }

  function incrementCount(userId, hashMap) {
    for (let i = 0; i < hashMap.length; i++) {
      if (userId === hashMap[i].user) {
        hashMap[i].count += 1;
        return hashMap;
      }
    }
  }

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <h1>Booklab leaderboard</h1>
        {rankings.map((item, index) => (
          <RankingItem key={index} data={item} rank={index + 1}></RankingItem>
        ))}
      </div>
    </div>
  );
}
