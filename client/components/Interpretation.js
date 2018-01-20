import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import dict from '../../dreamdic.json'


const Interpretation = props => {

  console.log('dictionary length', dict.length)

  return (
    <div>
      <h3>Translation</h3>
      <div id="results" style={resultsStyle}>
        <div id="interimResults" style={interimStyle}></div>
      </div>
    </div>
  )

}

// [
//   { "site": "http://www.paranormality.com/dream_dictionary_a.shtml",
//   "dream": "\n\nAbandon",
//   "meaning": "Abandon\n\nTo dream that you are abandoned, denotes that you will have difficulty\nin framing your plans for future success.\n\nTo abandon others, you will see unhappy conditions piled thick around you,\nleaving little hope of surmounting them.\n\nIf it is your house that you abandon, you will soon come to grief\nin experimenting with fortune.\n\nIf you abandon your sweetheart, you will fail to recover lost valuables,\nand friends will turn aside from your favors.\n\nIf you abandon a mistress, you will unexpectedly come into\na goodly inheritance.\n\nIf it is religion you abandon, you will come to grief by your attacks\non prominent people.\n\nTo abandon children, denotes that you will lose your fortune\nby lack of calmness and judgment.\n\nTo abandon your business, indicates distressing circumstances in which there\nwill be quarrels and suspicion.  (This dream may have a literal fulfilment\nif it is impressed on your waking mind, whether you abandon a person,\nor that person abandons you, or, as indicated, it denotes other worries.)\n\nTo see yourself or friend abandon a ship, suggests your possible\nentanglement in some business failure, but if you escape to shore\nyour interests will remain secure." }
// ]


export default Interpretation


const styles = {
  microphoneButton: {
    borderRadius: '50%',
    background: 'black'
  },
  microphoneImg: {
    padding: '.5em'
  },
  interimStyle: {
    color: 'yellow'
  },
  finalStyle: {
    color: 'green'
  },
  resultsStyle: {
    color: 'gray',
    padding: '2em',
  }
}

const { microphoneButton, microphoneImg, interimStyle, finalStyle, resultsStyle } = styles
