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

    let finalTranscript = ''

    console.log('this.state.listening?', this.state.listening)

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
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      console.log('finalTranscript', finalTranscript)

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if ( (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') ||
           (stopCmd[0] === 'stop' && stopCmd[1] === 'recording') ||
           (stopCmd[1] === 'stop')
        ) {
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening per command")
          document.getElementById('dreamcircle').className = 'appear'
          const dream = finalTranscript
          console.log('finalTranscript onend cmd: ', finalTranscript)
          console.log('Dream: ', dream)
          this.props.postDream({dream})
        }
      }
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    return (
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
};

const {
  container,
  title,
  img,
} = styles;
