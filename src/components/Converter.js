import React, { useState } from "react";
import axios from "axios";
import "./CurrencyConverter.css"; // Import the CSS file for styling

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  const handleConvert = () => {
    axios
      .get(API_URL)
      .then((response) => {
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];
        if (rate) {
          setConvertedAmount((amount * rate).toFixed(2));
          setError(null);
        } else {
          setError("Currency not supported.");
        }
      })
      .catch((err) => {
        setError("Unable to perform conversion. Please try again later.");
        console.error(err);
      });
  };

  return (
    <div className="converter-container">
      <div className="converter-card">
        <h1 className="converter-title">Currency Converter</h1>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>From Currency</label>
          <select
            className="form-control"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        <div className="form-group">
          <label>To Currency</label>
          <select
            className="form-control"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        <button className="convert-btn" onClick={handleConvert}>
          Convert
        </button>
        {convertedAmount && (
          <div className="result success">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
        )}
        {error && <div className="result error">{error}</div>}
      </div>
    </div>
  );
}

export default CurrencyConverter;
