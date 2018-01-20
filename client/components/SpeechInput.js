import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import sentiment from "sentiment";
import { postDream } from "../store";

const test =
  "Last night I had a scary dream. I was in an old abandonded cabin, and a clown with a chainsaw was chasing me. I locked myself in the greenhouse in the back, but he found me. I was laying on the ground and couldn/'t move. I woke up before he got any closer.";

const test2 = "Hey you worthless scumbag";

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const grammar =
  "#JSGF V1.0; grammar commands; public <command> = ( start | end ) dream";

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";


class SpeechInput extends Component {
  constructor() {
    super();
    this.state = {
      listening: false,
      dream: "",
      showFinalSpeech: false
    };
    // this.reset = this.reset.bind(this)
    this.toggleListen = this.toggleListen.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  // reset() {
  //   this.setState({
  //     listening: false
  //   })
  // }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    })
  }

  handleClick() {

    if (this.state.listening) {
      recognition.start()
    } else {
      recognition.stop()
    }

    recognition.onstart = () => {
      console.log("Listening")
    }

    recognition.onend = () => {
      console.log("End listening")
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
      final.innerHTML = finalTranscripts + ' ';
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    return (
      <div style={speechContainer}>
        <div id="results" style={resultsStyle}>
          <div id="interimResults" style={interimStyle} />
          <div id="finalResults" style={finalStyle} />
        </div>
        <button onClick={() => {
            this.toggleListen()
            this.handleClick()
          }}
          style={microphoneButton}>
          <img style={microphoneImg} src="/images/microphone.png" />
        </button>
        <div id="diagnostic" />
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => {
  return bindActionCreators({postDream}, dispatch)
};

export default connect(mapState, mapDispatch)(SpeechInput);

const styles = {
  speechContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    margin: '5em'
  },
  microphoneButton: {
    borderRadius: "50%",
    background: "black",
    width: '60px'
  },
  microphoneImg: {
    padding: ".5em"
  },
  interimStyle: {
    color: "yellow"
  },
  finalStyle: {
    color: "green"
  },
  resultsStyle: {
    color: "gray",
    padding: "2em"
  }
};

const {
  speechContainer,
  microphoneButton,
  microphoneImg,
  interimStyle,
  finalStyle,
  resultsStyle
} = styles;
