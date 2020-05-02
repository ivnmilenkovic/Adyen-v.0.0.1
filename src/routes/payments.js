const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/payments');

router.post('/', async(req, res, next) => {
  try {
    // when the request comes here we redirect it to controller
    const response = await ctrl.createPayment(req.body);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
});
router.get('/methods', async(req, res, next) => {
  try {
    const response = await ctrl.fetchPaymentMethods();
    return res.status(200).send(response);
  } catch (e) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
});
router.get('/details', async(req, res, next) => {
  try {
    const response = await ctrl.fetchDetails();
    return res.status(200).send(response);
  } catch (e) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
});



module.exports = router;
