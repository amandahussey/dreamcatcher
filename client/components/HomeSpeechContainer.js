import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import sentiment from "sentiment";
import { postDream } from "../store";

//------------------------------ANIMATE-------------------------------------
const handleClick = () => {
  document.getElementById('dreamcatcher-img').className = 'animate'
  document.getElementById('title').className = 'dissolve'
  document.getElementById('dreamcircle').className = 'appear'
  document.getElementById('click-to-start').className = 'appear'
}
//--------------------------------------------------------------------------

//------------------------------SPEECH--------------------------------------
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const grammar =
  "#JSGF V1.0; grammar commands; public <command> = ( start | end ) dream";

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
//--------------------------------------------------------------------------

class HomeSpeechContainer extends Component {
  constructor() {
    super();
    this.state = {
      listening: false,
      dream: "",
      showFinalSpeech: false
    };
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this);
  }


  toggleListen() {
    this.setState({ listening: !this.state.listening }, () => {
      if (this.state.listening) document.getElementById('dreamcircle').className = 'appear rotate'
      else document.getElementById('dreamcircle').className = 'appear'
      this.handleListen()
    })
  }

  handleListen() {

    console.log('listening', this.state.listening)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      console.log('else statement')
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening")
      }
    }

    recognition.onstart = () => {
      console.log("Listening")
    }

    recognition.onresult = event => {
      const interim = document.getElementById("interimResults"),
            final = document.getElementById("finalResults"),
            diagnostic = document.getElementById("diagnostic")

      let interimTranscripts = '',
          finalTranscripts = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscripts += transcript;
        else interimTranscripts += transcript;
      }
      interim.innerHTML = interimTranscripts;
      final.innerHTML += finalTranscripts + ' ';
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    return (
      <div>

        <div style={container}>
          <div id='title' style={title}>d r e a m c a t c h e r</div>
          <img id='dreamcatcher-img'
            src='/images/dreamcatcher.png'
            style={img}
            onClick={handleClick}
          />
          <img
            id='dreamcircle'
            src='/images/dreamcircle.png'
            onClick={this.toggleListen}
          />
          <p id='click-to-start'>...click to begin recording...</p>
        </div>

        <div style={speechContainer}>
          <div id="results" style={resultsStyle}>
            <div id="interimResults" style={interimStyle} />
            <div id="finalResults" style={finalStyle} />
          </div>
        </div>

      </div>
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => {
  return bindActionCreators({postDream}, dispatch)
};

export default connect(mapState, mapDispatch)(HomeSpeechContainer);

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
  speechContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    position: 'relative',
    textAlign: 'center',
    color: 'white'
  },
  resultsStyle: {
    padding: "2em",
    position: 'absolute',
    top: '15%',
    left: '20%',
    right: '20%'
  },
  interimStyle: {
    color: "gray",
    background: 'yellow'
  },
  finalStyle: {
    color: "black",
    background: 'green'
  },
  microphoneImg: {
    padding: ".5em"
  },
};

const {
  container,
  title,
  img,
  speechContainer,
  interimStyle,
  finalStyle,
  resultsStyle
} = styles;
