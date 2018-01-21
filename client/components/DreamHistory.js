import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import dict from '../../dreamdic.json'
import { DreamCard } from './index'


const DreamHistory = props => {

  return (
    <div style={historyContainer}>
      {props.dreams
        .reverse()
        .map(dream =>
        <DreamCard key={dream.id} dream={dream} />
      )}
    </div>
  )
}

const styles = {
  historyContainer: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center'
  },
}

const { historyContainer } = styles

export default withRouter(DreamHistory)
