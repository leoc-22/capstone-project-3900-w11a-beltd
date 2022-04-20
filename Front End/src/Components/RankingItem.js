import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  positionCard: {
    marginTop: "30px",
    borderRadius: "10px",
    width: "60%",
  },
  media: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

// user ranking component on leaderboard
export default function RankingItem(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    getUserFromId(props.data.user);
  }, []);

  // get user data
  async function getUserFromId(userId) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/users",
    });

    for (let i = 0; i < res.data.length; i++) {
      if (userId === res.data[i]._id) {
        setImg(res.data[i].image);
        setName(res.data[i].name);
      }
    }
  }
  function goToProfile() {
    history.push("PublicProfiles?id=" + props.data.user);
    return;
  }

  return (
    <div className={classes.positionCard}>
      <Card sx={{ display: "flex", padding: "20px" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            marginRight: "30px",
          }}
          image={img}
          onClick={goToProfile}
          alt="profile picture"
          className={classes.media}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h5"
              className={classes.media}
              onClick={goToProfile}
            >
              {props.rank + ". " + name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {"Completed " + props.data.count + " Goals"}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}

RankingItem.propTypes = {
  data: {
    user: PropTypes.any,
  },
  rank: PropTypes.any,
};
