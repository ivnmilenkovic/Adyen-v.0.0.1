const configuration = {
  paymentMethodsResponse, // The `/paymentMethods` response from the server.
  originKey,
  locale: "en-US",
  environment: "test",
  onSubmit: (state, dropin) => {
    // Your function calling your server to make the `/payments` request
    makePayment(state.data)
      .then(response => {
        if (response.action) {
          // Drop-in handles the action object from the /payments response
          dropin.handleAction(response.action);
        } else {
          // Your function to show the final result to the shopper
          showFinalResult(response);
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  onAdditionalDetails: (state, dropin) => {
    // Your function calling your server to make a `/payments/details` request
    makeDetailsCall(state.data)
      .then(response => {
        if (response.action) {
          // Drop-in handles the action object from the /payments response
          dropin.handleAction(response.action);
        } else {
          // Your function to show the final result to the shopper
          showFinalResult(response);
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  paymentMethodsConfiguration: {
    card: { // Example optional configuration for Cards
      hasHolderName: true,
      holderNameRequired: true,
      enableStoreDetails: true,
      hideCVC: false, // Change this to true to hide the CVC field for stored cards
      name: 'Credit or debit card'
    }
  }
};

const checkout = new AdyenCheckout(configuration);
const dropin = checkout.create('dropin').mount('#dropin-container');

function showFinalResult(response) {
  // todo: redirect to success page
  alert(response);
}


function makePayment(data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', '/payments');

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(JSON.parse(request.response));
      } else {
        reject(JSON.parse(request.statusText));
      }
    };
    request.onerror = () => reject(request.statusText);

    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
  });
};

function makeDetailsCall(data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', '/payments/details');

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(JSON.parse(request.response));
      } else {
        reject(JSON.parse(request.statusText));
      }
    };
    request.onerror = () => reject(request.statusText);

    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
  });
};
