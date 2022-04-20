import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import BookList from "./BookList";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  gridClass: {
    marginTop: "0px",
    minWidth: "15%",
    minHeight: "275px",
  },
});

// book grid component
export default function TopBooksGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.books.map((book, index) => {
          return (
            <Grid
              item
              xs={4}
              sm={3}
              md={2}
              key={index}
              className={classes.gridClass}
            >
              <BookList key={index} book={book} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

TopBooksGrid.propTypes = {
  books: PropTypes.array,
  user: PropTypes.object,
};
