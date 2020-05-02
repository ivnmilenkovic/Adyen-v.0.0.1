require('dotenv').config();

const { Client, Config, CheckoutAPI } = require('@adyen/api-library');
const config = new Config();
// Set your X-API-KEY with the API key from the Customer Area.
const { API_KEY, MERCHANT_ACCOUNT } = process.env;
config.apiKey = API_KEY;
config.merchantAccount = MERCHANT_ACCOUNT;

const client = new Client({ config });
client.setEnvironment('TEST');
const checkout = new CheckoutAPI(client);


async function fetchPaymentMethods() {
  try {
    return await checkout.paymentMethods({
      amount: {
        currency: 'EUR',
        value: 1000,
      },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      channel: 'Web',
      merchantAccount: config.merchantAccount
    });

  } catch (e) {
    throw e;
  }
}

async function createPayment(request) {
  try {
    return await checkout.payments({
      paymentMethod: request.paymentMethod, // Data object passed from onSubmit event of the front end
      amount: {
        currency: 'EUR',
        value: 1000,
      },
      shopperEmail: 'ivn@getnada.com',
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      channel: 'Web',
      reference: 'YOUR_ORDER_NUMBER',
      merchantAccount: config.merchantAccount,
      lineItems: [
        {
          quantity: '1',
          amountExcludingTax: '331',
          taxPercentage: '2100',
          description: 'Shoes',
          id: 'Item #1',
          taxAmount: '69',
          amountIncludingTax: '400'
        },
        {
          quantity: '2',
          amountExcludingTax: '248',
          taxPercentage: '2100',
          description: 'Socks',
          id: 'Item #2',
          taxAmount: '52',
          amountIncludingTax: '300'
        }
      ],
      returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy'
    });

  } catch (e) {
    throw e;
  }
}

module.exports = {
  fetchPaymentMethods,
  createPayment
};
