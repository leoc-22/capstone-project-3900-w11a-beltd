import React, { useEffect, useState } from 'react';
import Carousel from 'react-grid-carousel'
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';




const useStyles = makeStyles({
    main:{
        marginLeft : "5%",
        marginRight : "5%",

    },
    PopCollections : {
        marginLeft : "20%",
        marginTop: "10%",
        maxHeight: "70px"

    },
    img: {
        borderRadius: "10px",
        width:"95%",
        height : "100%", 
      '&:hover': {
        cursor:"pointer",
      }
    }
    


      
})


export default function CollectionsCarousel() {
    const history = useHistory();
    const classes = useStyles();

    return (
    <div className={classes.main}>

        <Carousel 
            className={classes.PopCollections}
            cols={4} 
            rows={1} 
            gap={5} 
            loop
        >
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                onClick = {() => history.push("/login")}
                className={classes.img} 
                src ="PlaceHolder.png"
               />
            </Carousel.Item>

        </Carousel>
    </div>



    )
}