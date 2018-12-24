const express = require('express');
const db = require('../db')

const router = express.Router();

router.get('/sms.json', async (req, res, next) => {
  try {
    const { rows } = await db.fetchAll()
    let items = rows.reduce(function(groups, item) {
      const val = item["number"]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
    res.send({items: items, ids: Object.keys(items)})
  } catch(err) {
      next(err)
  }
})

router.post('/sms.json', async (req, res, next) => {
  const { number, text } = req.body
  try {
    const { rows } = await db.createSms(number, text)
    res.send(rows[0])
  } catch(err) {
    next(err)
  }
})

module.exports = router;
