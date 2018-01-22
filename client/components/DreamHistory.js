import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import dict from '../../dreamdic.json'
import { DreamCard, HistoryCloud } from './index'


const DreamHistory = props => {

  return (
    <div style={container}>
      <HistoryCloud />
      <div style={historyContainer}>
        {props.dreams
          .reverse()
          .map(dream =>
          <DreamCard key={dream.id} dream={dream} />
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  historyContainer: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
    padding: '3em'
  },
}

const { container, historyContainer } = styles

export default withRouter(DreamHistory)
