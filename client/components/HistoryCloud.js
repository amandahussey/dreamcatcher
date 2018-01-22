import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import WordCloud from 'wordcloud'
import sentiment from 'sentiment'

class HistoryCloud extends Component {

  constructor() {
    super()
    this.state = {
      mounted: false
    }
    this.generateWordCloud = this.generateWordCloud.bind(this)
  }

  componentDidUpdate() {
    if (this.props.dreams.length) this.generateWordCloud()
  }

  generateWordCloud() {
    const { dreams } = this.props

    const sentiments = dreams.map(dream => sentiment(dream.dream))
    const negatives = sentiments.map(dreamSentiment => dreamSentiment.negative).filter(arr => arr.length)
    const positives = sentiments.map(dreamSentiment => dreamSentiment.positive).filter(arr => arr.length)

    const negativeWords = negatives.map(arr => arr.join(' ')).join(' ').split(' ')
    const positiveWords = positives.map(arr => arr.join(' ')).join(' ').split(' ')

    const negativeWordsSentimentScore = negativeWords.map(negativeWord => {
      return [
        negativeWord,
        Math.abs(sentiment(negativeWord).score) * 3
      ]
    })
    const positiveWordsSentimentScore = positiveWords.map(positiveWord => {
      return [
        positiveWord,
        (sentiment(positiveWord).score) * 3
      ]
    })

    const removePunctuation = word => {
      return (word[word.length-1] === '.' || word[word.length-1] === ',')
      ? word.slice(0, word.length-1)
      : word
    }

    const allWordsArr = dreams.map(dream => dream.dream.toLowerCase()).join(' ').split(' ').map(word => removePunctuation(word))
    const allWordsString = allWordsArr.join(' ')
    const allWordsSet = new Set(allWordsArr)
    const allWordsArrDuplicatesRemoved = Array.from(allWordsSet)

    const computeWordFrequency = chosenWord => {
      let frequency = 0
      allWordsArr.forEach(word => {
        if (word === chosenWord) frequency++
      })
      return frequency
    }

    // count frequency of each unique word in allWordsArr
    const totalNonUniqueWords = allWordsArr.length;
    const totalUniqueWords = allWordsArrDuplicatesRemoved.length;
    const allWordsFrequency = allWordsArrDuplicatesRemoved.map(word => {
      return [ word, computeWordFrequency(word)*2 ]
    })

    const removeSmallWords = allWordsFrequency.filter(arr => {
      return arr[0].length > 3
    })

    console.log('totalNonUniqueWords', totalNonUniqueWords)
    console.log('totalUniqueWords', totalUniqueWords)
    console.log('allWordsFrequency', allWordsFrequency)
    console.log('removeSmallWords', removeSmallWords)

    const list = positiveWordsSentimentScore.concat(negativeWordsSentimentScore).concat(removeSmallWords)

    console.log('negativeWords', negativeWords)
    console.log('positiveWords', positiveWords)

    console.log('negativeWordsSentimentScore', negativeWordsSentimentScore)
    console.log('positiveWordsSentimentScore', positiveWordsSentimentScore)

    console.log('list', list)

    const canvas = document.getElementById('canvas')
    // canvas.getContext('2d').fillStyle = '#100213'
    // canvas.getContext('2d').fillRect(20,20,150,100)

    console.log('canvas', canvas)

    const options = {
      list: list,
      gridSize: Math.round(16 * 1500 / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 2.3) *  600 / 1024;
      },
      fontFamily: 'Mirza',
      color: function (word) {
        if(positiveWords.includes(word)) return '#215784'
        if(negativeWords.includes(word)) return '#2A1D7D'
        else return '#5C57A5'
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: '#100213',
      minSize: '16px',
      drawOutOfBound: true,
      wait: setTimeout(1000)
    }

    WordCloud(document.getElementById('canvas'), options)
  }


  render () {
    return this.props.dreams.length
    ? <span style={canvas} id='canvas'></span>
    : <div>Loading Word Cloud...</div>
  }
}

const mapState = state => {
  return {
    dreams: state.dreams
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(HistoryCloud)

const styles = {
  canvasContainer: {
    display: 'flex',
    background: '#12314B',
    margin: '2em',
    width: '250px',
    borderRadius: '10px'
  },
  canvas: {
    width: '600px',
    height: '300px',
    padding: '1em'
  }
}

const { canvasContainer, canvas } = styles
