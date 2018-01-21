import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";


const handleClick = () => {
  document.getElementById('dreamcatcher-img').className = 'animate'
  document.getElementById('title').className = 'dissolve'
  document.getElementById('dreamcircle').className = 'appear'
  document.getElementById('click-to-start').className = 'appear'
}

const Home = props => {

  return (
    <div>
      <div style={container}>
        <div id='title' style={title}>d r e a m c a t c h e r</div>
        <img id='dreamcatcher-img'
          src='/images/dreamcatcher.png'
          style={img}
          onClick={handleClick}
        />
        <img id='dreamcircle' src='/images/dreamcircle.png'/>
        <p id='click-to-start'>...click to begin recording...</p>
      </div>
    </div>
  )
}

export default Home

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '40px',
    fontFamily: "'Raleway Dots', cursive",
    padding: '1em',
    textAlign: 'center',
  },
  img: {
    width: '400px',
    padding: '1em'
  },
}

const {
  container,
  title,
  img
} = styles
