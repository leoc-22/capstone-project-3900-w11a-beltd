/* eslint-disable */ 

import React, {useState, useEffect} from "react";
import Carousel from "react-grid-carousel";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";
import axios from "axios";

const useStyles = makeStyles({
  cover: {
    borderRadius: "8px",
    height: "200px",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  name : {
    color :"black"
  },
  creator : {
    marginTop: "-15px",
  }
});

const AdjustedCollections = (props => {
  const classes = useStyles();
  const history = useHistory();

  function collectionDetail(id){
    history.push({
      pathname: "/collection-detail?id=" +id,
      //state: { user: props.user },
    });
    location.reload();

  }

  const randomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className={classes.main} zindex="999">
      <Carousel
        className={classes.PopCollections}
        cols={4}
        rows={1}
        gap={20}
        loop
      >
        {props.collections.map((Item) =>(
          <Carousel.Item>
            <div className={classes.cover} style={{backgroundColor: randomRgbColor()}} onClick = {()=>collectionDetail(Item._id)}></div>
            <p><b>{Item.name}</b></p>
            <div className={classes.creator}>{"By "+ Item.creator}</div>
            {/* Swap public tag or private tag depending on collection */}
            <Chip label={Item.public} size="small" />

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
})
export default AdjustedCollections;