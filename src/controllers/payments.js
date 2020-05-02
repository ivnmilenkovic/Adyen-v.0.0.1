require('dotenv').config();
const service = require('../services/payments');


async function createPayment(request) {
  try {
    return await service.createPayment(request);
  } catch (e) {
    throw e;
  }
}

async function fetchPaymentMethods() {
  try {
    return await service.fetchPaymentMethods();
  } catch (e) {
    throw e;
  }
}

async function fetchDetails() {
  return await checkout.paymentsDetails({
      amount: {
        currency: 'EUR',
        value: 1000,
      },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      channel: 'Web',
      merchantAccount: config.merchantAccount
    })
    .then(res => {
      return res;
    })
    .catch(e => e);
}

module.exports = {
  createPayment: createPayment,
  fetchPaymentMethods: fetchPaymentMethods,
  fetchDetails: fetchDetails
};
