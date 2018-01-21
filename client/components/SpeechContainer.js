import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import sentiment from "sentiment";
import { postDream } from "../store";
import { DreamText } from './index'


//-------------------------SPEECH-SETUP--------------------------------------

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


//-------------------------COMPONENT-START-----------------------------------

class SpeechContainer extends Component {

  constructor() {
    super();
    this.state = {
      listening: false,
      dreamText: '',
      showFinalSpeech: false,
      submittedDream: false
    };
    this.toggleListen = this.toggleListen.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }


  toggleListen() {
    this.setState({ listening: !this.state.listening }, () => {

      const dreamcircle = document.getElementById('dreamcircle')
      const clickToStart = document.getElementById('click-to-start')
      let dreamcircleClass, clickToStartInnerHTML

      if (this.state.listening) {
        dreamcircleClass = 'appear rotate'
        clickToStartInnerHTML = '...recording dream...'
      } else {
        dreamcircleClass = 'appear'
        clickToStartInnerHTML = '...click to start recording dream...'
      }

      dreamcircle.className = dreamcircleClass
      clickToStart.innerHTML = clickToStartInnerHTML
      this.handleListen()

    })
  }

  handleEnd(dreamText) {
    document.getElementById('dreamcircle').className = 'appear'
    this.setState({ dreamText }, () => {
      this.setState({ showFinalSpeech: true })
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
        this.handleEnd(finalTranscript)
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


      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if ( (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') ||
           (stopCmd[0] === 'stop' && stopCmd[1] === 'recording') )
      {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const dreamText = transcriptArr.slice(0, -3).join(' ')
          this.handleEnd(dreamText)
        }
      }
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

//------------------------------RENDER---------------------------------------

  render() {
    return !this.state.showFinalSpeech ?
    (
      <div style={container}>
        <img
          id='dreamcircle'
          src='/images/dreamcircle.png'
          onClick={this.toggleListen}
        />
        <p id='click-to-start'>...click to start recording dream...</p>
      </div>
    ) : (
      <DreamText dreamText={this.state.dreamText} postDream={this.props.postDream} />
    )
  }
}

//-------------------------CONNECT-COMPONENT---------------------------------

const mapState = null;
const mapDispatch = dispatch => {
  return bindActionCreators({postDream}, dispatch)
};

export default connect(mapState, mapDispatch)(SpeechContainer);


//------------------------------CSS------------------------------------------

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
