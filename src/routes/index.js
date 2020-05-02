require('dotenv').config();
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/payments');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const originKey = process.env.ORIGIN_KEY;
    const paymentMethodsResponse = await ctrl.fetchPaymentMethods();

    res.render('index', { title: 'Adyen Web Integration Demo', paymentMethodsResponse, originKey });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
