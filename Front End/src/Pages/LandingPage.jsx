import React from "react";
import LandingPageTopBar from "../Components/LandingPageTopBar";
import Header from "../Components/Header";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
  },
  popularCollections: {
    marginLeft: "7%",
    marginTop: "5%",
  },
  TopBooks: {
    marginLeft: "7%",
    marginTop: "5%",
  },
  test: {},
});

export default function LandingPage() {
  const classes = useStyles();

  const [popular, setPopular] = React.useState();

  const handleclick = () => {
    const params = {
      api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
      type: "category",
      category_id: "4366",
      amazon_domain: "amazon.com",
      output: "json",
      include_html: "false",
    };

    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((res) => {
        console.log("retrieved data");
        // console.log(JSON.stringify(response.data, 0, 2));
        setPopular(res.data.category_results); // a list of books
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LandingPageTopBar></LandingPageTopBar>

      <div className={classes.main}>
        <Header></Header>
        <h2 className={classes.popularCollections}>Popular Collections</h2>
        <button onClick={() => handleclick()}>Load</button>
        <CollectionsCarousel popular={popular}></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid></TopBookGrid>
      </div>
    </div>
  );
}
