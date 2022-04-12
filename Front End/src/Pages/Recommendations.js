import React from "react";
import AuthenticatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import recs from "../Images/recommendations.svg";
import Grid from "@mui/material/Grid";
// import TopBookItem from "../Components/TopBookItem";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  header: {
    marginTop: "100px",
  },
  searchType: {
    color: "#FB8C00",
    padding: 0,
    margin: 0,
  },
  searchFor: {
    padding: 0,
    margin: 0,
  },
  headerImg: {
    width: "100%",
  },
});

export default function RecommendationsPage() {
  const classes = useStyles();

  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <AuthenticatedTopBar></AuthenticatedTopBar>
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.header}>
            <h1>Recommended books for you</h1>
            <p>A curated list of books for a reader just like you</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter by"
                onChange={handleChange}
              >
                <MenuItem value="Popular">Popular books</MenuItem>
                <MenuItem value="Authors">Authors in my collection</MenuItem>
                <MenuItem value="Genres">Genres in my collection</MenuItem>
                <MenuItem value="5stars">5 star rating</MenuItem>
                <MenuItem value="4stars">4 star rating</MenuItem>
                <MenuItem value="3stars">3 star rating</MenuItem>
                <MenuItem value="2stars">2 star rating</MenuItem>
                <MenuItem value="1stars">1 star rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <img
              className={classes.headerImg}
              src={recs}
              alt={"two people sitting together"}
            />
          </Grid>
        </Grid>
        <br />
        <h2>Results</h2>
        {/* Format results with TopBookItem component */}
      </div>
    </div>
  );
}
