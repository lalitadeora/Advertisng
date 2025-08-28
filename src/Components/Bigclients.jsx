import React, { useState } from "react";
import "./Bigclients.css";

function Bigclients() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
    plan: "",
    duration: "",
    dateFrom: "",
    amount: "",
  });

  const [showInvoice, setShowInvoice] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setShowInvoice(true);
  };

  return (
    <div className="invoice-generator">
      {!showInvoice ? (
        <div className="invoice-form">
          <h2>Invoice Generator</h2>
          <input
            name="name"
            placeholder="Customer Name"
            onChange={handleChange}
          />
          <input
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
          />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="plan" placeholder="Plan Name" onChange={handleChange} />
          <input
            name="duration"
            placeholder="Duration (e.g. 7 days)"
            onChange={handleChange}
          />
          <input name="dateFrom" type="date" onChange={handleChange} />
          <input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            onChange={handleChange}
          />
          <button onClick={handleGenerate}>Generate Invoice</button>
        </div>
      ) : (
        <div className="invoice">
          <div className="invoice-header">
            <div className="logo">
              DEORA
              <br />
              <span>ADVERTISING</span>
            </div>
            <div className="title">INVOICE</div>
          </div>

          <div className="invoice-details">
            <div className="left">
              <p>
                <strong>ISSUED TO:</strong>
                <br />
                {formData.name}
                <br />
                {formData.company}
                <br />
                {formData.address}
              </p>
              <p>
                <strong>PAY TO:</strong>
                <br />
                Borcele Bank
                <br />
                Account Name: Adeline Palmerston
                <br />
                Account No.: 0123 4567 8901
              </p>
            </div>
            <div className="right">
              <p>
                <strong>INVOICE NO:</strong> 01234
                <br />
                <strong>GSTIN:</strong> <i>Not Registered</i>
                <br />
                <strong>BILL DATE:</strong> {new Date().toLocaleDateString()}
                <br />
                <strong>DUE DATE:</strong> Not Specified
              </p>
            </div>
          </div>

          <div className="invoice-table">
            <div className="table-header">
              <span>NAME OF PLAN</span>
              <span>DURATION</span>
              <span>DATE FROM</span>
              <span>AMOUNT</span>
            </div>
            <div className="table-row">
              <span>{formData.plan}</span>
              <span>{formData.duration}</span>
              <span>{formData.dateFrom}</span>
              <span>₹ {formData.amount}</span>
            </div>
          </div>

          <div className="totals">
            <div>
              <strong>SUBTOTAL</strong>
              <span>₹ {formData.amount}</span>
            </div>
            <div>
              GST <span>NA</span>
            </div>
            <div className="total">
              <strong>TOTAL</strong>
              <span>₹ {formData.amount}</span>
            </div>
          </div>

          <div className="footer">
            <div>
              <strong>CONTACT INFO.</strong>
              <br />
            </div>
            <div className="signature">
              <strong>AUTHORIZED SIGNATURE</strong>
              <br />
              <i>DEORA ADVERTISING</i>
              <br />
              (OWNER)
            </div>
          </div>

          <div className="notes">
            *GST not applicable as the company is not registered under GST.
            <br />
            This is a computer-generated invoice and does not require a
            signature.
          </div>
        </div>
      )}
    </div>
  );
}

export default Bigclients;
