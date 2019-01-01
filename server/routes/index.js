const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/api/sms', async (req, res, next) => {
  try {
    const { rows } = await db.fetchAll();
    const items = rows.reduce((groups, item) => {
      const val = item.number;
      const grouped = groups;
      grouped[val] = grouped[val] || [];
      grouped[val].push(item);
      return grouped;
    }, {});
    res.send({ items, ids: Object.keys(items) });
  } catch (err) {
    next(err);
  }
});

router.post('/api/sms', async (req, res, next) => {
  const { number, text } = req.body;
  try {
    const { rows } = await db.createSms(number, text);
    res.send(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
