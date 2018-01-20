const Sequelize = require('sequelize')
const db = require('../db')

const Dream = db.define('dream', {
  dream: {
    type: Sequelize.TEXT
  }
})

module.exports = Dream
