// @format

const API = "https://exchange.api.bity.com/v2/";

export const placeOrder = (name, IBAN, amount, address) => {
  return fetch(API + "orders", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      input: {
        amount,
        currency: "ETH",
        type: "crypto_address",
        crypto_address: address
      },
      output: {
        currency: "EUR",
        type: "bank_account",
        iban: IBAN,
        owner: {
          name
        }
      }
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};

export const getOrder = id => {
  return fetch(`${API}orders/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(res => res.json());
};

// TODO: Figure out what this does
export const calculateEstimate = data => {
  return (
    fetch("https://exchange.api.bity.com/v2/orders/estimate", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        input: {
          currency: "ETH",
          amount: data.amount.toFixed(4)
        },
        output: {
          currency: "EUR"
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      // TODO: I don't think we need this
      .then(response => response)
      .catch(error => error)
  );
};