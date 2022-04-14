/* eslint-disable */
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core";
import {styled } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";


const useStyles = makeStyles({
  BookLabTitle: {
    color : "#444444",
    paddingLeft : "50px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  BtnText : {
    color : "#444444"
  },
  BtnTextActive : {
    color : "#1976d2",
    fontWeight : "bold"
  },
  iconBtn: {
    marginLeft: "10%",
    marginTop: "10px",
    border: "none",
    background: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIcon : {
    marginLeft: "-140px",

  },
  textItem: {
    marginTop: "-20px",
    marginRight: "20px",
    minWidth: "100px",
    maxWidth: "175px",
    marginLeft : "0px"
  },
  divider : {
    minWidth : '50px'
  }



});

const ButtonTest = styled(Button)(() => ({
  borderRadius : "0px",
  marginTop : "10px",
  minHeight: "60px",
  maxHeight: "60px",
  marginLeft : "20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor : "transparent",
    cursor: "pointer",
    borderBottom: "3px solid #1976d2",
  }  
}));

const AppBar1 = styled(AppBar)(() => ({
  backgroundColor: "#F3F3F3",
  color : "black",
  minHeight: "65px",
  maxHeight : "65px",
  boxShadow : "none",
  borderBottom: "0.5px solid #2196f3",

}));

const Container1 = styled(Container)(() => ({
  marginTop : "-10px"
}));


const pages = ["Explore", "Collections", "Recommendations", "Leaderboard"];
const settings = ["Profile", "Change password", "Goals", "Logout"];

export default function AuthenicatedTopBar() {
  
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [ExploreBtn, setExploreBtn] = useState(null);
  const [CollectionsBtn, setCollectionsBtn] = useState(null);
  const [RecommendationsBtn, setRecommendationsBtn] = useState(null);
  const [LeaderBoardBtn, setLeaderBoardBtn] = useState(null);
  const [seachOpen, setSeachOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  
  const history = useHistory();

  useEffect(() => {
    getLocation();
    getBookData();

  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  
  function handleSeachOpen() {
    if (seachOpen == false) {
      document.getElementById("searchText").hidden = false;
      setSeachOpen(true);
    } else {
      document.getElementById("searchText").hidden = true;
      setSeachOpen(false);
    }
  }

  const getBookData = () => {
    axios
      .get("http://localhost:8002/books/autocomplete")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError(error);
      })
 
  };


  const handleOptions = () => {
    // faster performance and unique values using set
    let optionList = new Set();

    // adding titles first, then authors, then genres
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].title);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].authors);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].categories[0].name);
    }
    return [...optionList];
  };



  function routePage(page) {
    if (page === "Explore") {
      history.push({
        pathname: "/search",
      });
    } else if (page === "Collections") {
      history.push({
        pathname: "/collections",
      });
    } else if (page === "Recommendations") {
      history.push({
        pathname: "/recommendations",
      });
    } else if (page === "Leaderboard") {
      history.push({
        pathname: "/LeaderBoard",
      })
    } else {
      return;
    }
  }

  function routeSettingPage(page) {
    let targetPage = page;
    if (targetPage === "Profile") {
      history.push({
        pathname: "/user-profile",
        //state: { user: props.user },
      });
    } else if (targetPage === "Change password") {
      history.push({
        pathname: "/user-settings",
        //state: { user: props.user },
      });
    } else if (targetPage === "Goals") {
      history.push({
        pathname: "/reading-goal",
        //state: { user: props.user },
      });
    } else if (targetPage === "Logout") {
      sessionStorage.clear();
      history.push("/");
    } else {
      return;
    }
  }

  async function search(val){
    let res = await axios({
      method : "GET",
      url : "http://localhost:8002/books/autocomplete",
    })
    const urlString = String(window.location.pathname);

    for (let i =0; i < res.data.length; i++){
      if (res.data[i].title == val){
        history.push("/search?id=" + res.data[i]._id);
        if (urlString.includes("search")){
          location.reload();
        }
      }
    }
  }

  function getLocation(){
  const urlString = String(window.location.pathname);
    if(urlString.includes("search")){
      //document.getElementById("Explore").textContent = "ef";
      setCollectionsBtn(classes.BtnText)
      setRecommendationsBtn(classes.BtnText)
      setLeaderBoardBtn(classes.BtnText);
      setExploreBtn(classes.BtnTextActive);
    } else if (urlString.includes("collections") || urlString.includes("collection-detail")) {
      setCollectionsBtn(classes.BtnTextActive)
      setRecommendationsBtn(classes.BtnText)
      setLeaderBoardBtn(classes.BtnText);
      setExploreBtn(classes.BtnText);
    } else if (urlString.includes("recommendations")) {
      setCollectionsBtn(classes.BtnText)
      setRecommendationsBtn(classes.BtnTextActive)
      setLeaderBoardBtn(classes.BtnText);
      setExploreBtn(classes.BtnText);
    } else if (urlString.includes("LeaderBoard")) {
      setCollectionsBtn(classes.BtnText)
      setRecommendationsBtn(classes.BtnText)
      setLeaderBoardBtn(classes.BtnTextActive);
      setExploreBtn(classes.BtnText);
    } else {
      setExploreBtn(classes.BtnText);
      setCollectionsBtn(classes.BtnText)
      setRecommendationsBtn(classes.BtnText)
      setLeaderBoardBtn(classes.BtnText);
    }
  }
  // var userName = localStorage.getItem("name");

  return (
    <AppBar1
      position="static"
      color="primary"
      sx={{ minWidth : "550px" }}

    >
      <Container1 maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() =>
              history.push({
                pathname: "/home",
                //state: { email: sessionStorage.getItem("email") },
              })
            }
            className={classes.BookLabTitle}
          >
            BOOKLAB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => routePage({ page })}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() =>
              history.push({
                pathname: "/home",
                state: { email: sessionStorage.getItem("email") },
              })
            }
            className={classes.BookLabTitle}
          >
            BOOKLAB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ButtonTest
              onClick={() => routePage("Explore")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <div className={ExploreBtn}>Explore</div>
            </ButtonTest>
            <ButtonTest
              onClick={() => routePage("Collections")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <div className={CollectionsBtn}>Collections</div>
            </ButtonTest>

            <ButtonTest
              onClick={() => routePage("Recommendations")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <div className={RecommendationsBtn}>Recommendations</div>
            </ButtonTest>

            <ButtonTest
              onClick={() => routePage("Leaderboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <div className={LeaderBoardBtn}>Leaderboard</div>
            </ButtonTest>
            
          </Box>
          
          <IconButton
              onClick={handleSeachOpen}
              class={classes.iconBtn}
              disableRipple
            >
              <SearchIcon></SearchIcon>
            </IconButton>
            <div className={classes.textItem} id="searchText" hidden>
            <Autocomplete
              disablePortal
              autoHighlight
              clearOnEscape
              freeSolo
              clearOnBlur={false}
              options={handleOptions()}
              sx={{ width: 230 }}
              renderInput={(params) => (
                <TextField
                InputProps={{ style: { fontSize: 5 } }}
                  {...params}
                  variant="standard"
                  style={{
                    width: "100%",
                    marginTop: 20,
                    fontSize: 6
                  }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              )}
              onChange={(e, value) => {
                setQuery(value);
                search(value)

              }}
            />
            </div>
            <div class={classes.divider}/>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  //alt={props.user.name}
                  src={sessionStorage.getItem("image")}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => routeSettingPage(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container1>
    </AppBar1>
  );
}
