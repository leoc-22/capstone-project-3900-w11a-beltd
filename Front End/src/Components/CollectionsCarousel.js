import React from "react";
import Carousel from "react-grid-carousel";
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
  const classes = useStyles();

  return (
    <div className={classes.main} zindex="999">
      <Carousel
        className={classes.PopCollections}
        cols={4}
        rows={1}
        gap={5}
        loop
      >
        {/* {props.books.map((book) => {
          console.log(book);
          <Carousel.Item id={book.asin}>
            <img
              className={classes.img}
              src={book.image == undefined ? "PlaceHolder.png" : book.image}
            />
          </Carousel.Item>;
        })} */}
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={classes.img}
            src={props.books[Math.floor(Math.random() * 48)].image}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
CollectionsCarousel.propTypes = {
  books: PropTypes.array,
};
