import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class DreamText extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dreamTextEdit: props.dreamText || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      dreamTextEdit: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postDream({ dream: this.state.dreamTextEdit })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={textContainer}>
        <label style={label}>...make any changes to your dream before saving...</label>
        <textarea onChange={this.handleChange} value={this.state.dreamTextEdit} style={textArea}></textarea>
        <button type="submit" style={saveButton}>save</button>
      </form>
    )
  }
}

export default DreamText;

const styles = {
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    padding: '1em',
    fontSize: '1.5em'
  },
  textArea: {
    fontFamily: "'Mirza', cursive",
    fontSize: '1.5em',
    lineHeight: '1.5em',
    width: '600px',
    padding: '1em',
    borderRadius: '6px'
  },
  saveButton: {
    fontFamily: "'Raleway Dots', cursive",
    margin: '1em 2em',
    fontSize: '2em',
    fontWeight: 'bold',
    borderRadius: '6px',
    background: '#12314B',
    borderColor: '#12314B',
    color: '#807CC6',
  },
}

const {
  textContainer,
  label,
  textArea,
  saveButton,
 } = styles
