import React from "react";
import Carousel from "react-grid-carousel";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main: {
    marginLeft: "5%",
    marginRight: "5%",
    position: "relative",
  },
  PopCollections: {
    marginLeft: "20%",
    marginTop: "10%",
    maxHeight: "70px",
  },
  img: {
    borderRadius: "10px",
    width: "95%",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default function CollectionsCarousel(props) {
  const history = useHistory();
  const classes = useStyles();

  console.log(JSON.stringify(props.popular));
  return (
    <div className={classes.main} zIndex="999">
      <Carousel
        className={classes.PopCollections}
        cols={4}
        rows={1}
        gap={5}
        loop
      >
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            onClick={() => history.push("/login")}
            className={classes.img}
            src="PlaceHolder.png"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
CollectionsCarousel.propTypes = {
  popular: PropTypes.object,
};
