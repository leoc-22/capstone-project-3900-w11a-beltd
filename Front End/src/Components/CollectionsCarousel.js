/* eslint-disable */ 

import React from "react";
import Carousel from "react-grid-carousel";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main: {
    position: "relative",
  },
  PopCollections: {
    marginTop: "10%",
  },
  img: {
    borderRadius: "8px",
    height: "200px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  name : {
    color :"black"
  }
});

export default function CollectionsCarousel(props) {
  const classes = useStyles();
  console.log(props.collections);
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
          <img
            src = "PlaceHolder.png"
            className={classes.img}
            alt = "collection img"
            />
            <h3>{Item.name}</h3>

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
