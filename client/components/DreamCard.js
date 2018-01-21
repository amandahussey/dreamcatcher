import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import dict from '../../dreamdic.json'
import moment from 'moment'


const DreamCard = props => {

  const { dream } = props

  return (
    <div style={dreamContainer} key={dream.id}>
      <div style={date}>{moment(dream.createdAt).format('llll')}</div>
      <p style={text}>{dream.dream.substr(0, 200)}</p>
    </div>
  )
}

const styles = {
  dreamContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: '#12314B',
    margin: '2em',
    width: '250px',
    borderRadius: '10px'
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    background: '#2A1D7D',
    borderRadius: '10px',
    padding: '1em',
  },
  text: {
    padding: '1em',
  }
}

const { dreamContainer, date, text } = styles

export default DreamCard
