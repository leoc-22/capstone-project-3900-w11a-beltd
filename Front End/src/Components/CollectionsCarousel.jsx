import React, { useState, useEffect } from "react";
import Carousel from "react-grid-carousel";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  cover: {
    borderRadius: "8px",
    height: "200px",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  name: {
    color: "black",
  },
  creator: {
    marginTop: "-15px",
  },
});

const CollectionsCarousel = React.memo((props) => {
  const [collectionArr, setCollectionArr] = useState([]);
  const [hasData, setHasData] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    filterData();
  }, [hasData]);

  // filter whether a collection is public or private
  function filterData() {
    let tmp = [];
    for (let i = 0; i < props.collections.length; i++) {
      if (props.collections[i].public == false) {
        props.collections[i].public = "Private";
      } else if (props.collections[i].public == true) {
        props.collections[i].public = "Public";
      }
      tmp.push(props.collections[i]);
    }
    setCollectionArr(tmp);
    setHasData(true);
  }

  function collectionDetail(id) {
    if (sessionStorage.getItem("id") == null) {
      history.push({
        pathname: "/un-Authed-collection-detail?id=" + id,
      });
    } else {
      history.push({
        pathname: "/collection-detail?id=" + id,
      });
    }
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
        {collectionArr.map((Item, index) => (
          <Carousel.Item key={index}>
            <div
              className={classes.cover}
              style={{ backgroundColor: randomRgbColor() }}
              onClick={() => collectionDetail(Item._id)}
            ></div>
            <p>
              <b>{Item.name}</b>
            </p>
            <div className={classes.creator}>{"By " + Item.creator}</div>
            {/* Swap public tag or private tag depending on collection */}
            <Chip label={Item.public} size="small" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
});
export default CollectionsCarousel;
CollectionsCarousel.displayName = "CollectionsCarousel";

CollectionsCarousel.propTypes = {
  collections: PropTypes.array,
};
