const router = require('express').Router()
const { Dream } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Dream.findAll()
    .then(dreams => res.json(dreams))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Dream.create(req.body)
    .then(dream => res.status(202).json(dream))
    .catch(next)
})
