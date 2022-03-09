import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';
import { List, ListItemIcon, ListItemText,   Grid, ListItem, IconButton} from '@material-ui/core';
import { Container } from '@mui/material';
import TopBookItem from './TopBookItem'


const useStyles = makeStyles({
    main:{
        marginLeft : "6%",
        marginRight : "7%",

    },
    gridClass:{
        marginTop: "0px",  
        minWidth : "15%",
        minHeight : "275px"      
    },

})


export default function TopBooksGrid() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Grid container spacing = {2}  >
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
                <br></br>
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
                <Grid item xs = {4} sm = {3} md = {2} className={classes.gridClass}>
                <TopBookItem >
                </TopBookItem>
                </Grid>
            </Grid>

        </div>
    
    )
}