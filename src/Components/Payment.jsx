import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Payment.css";

// Importing icons (using the public directory path for Vite)
const netBankingIcon = "/img/netbanking.png";
const cardIcon = "/img/CDcard.png";
const qrIcon = "/img/qrcode.png";
const walletIcon = "/img/wallets.png";
const upiIcon = "/img/UPI.png";
const cashIcon = "/img/CASH.png";

// Importing bank logos (using the public directory path for Vite)
const sbiLogo = "/img/sbi.png";
const iciciLogo = "/img/icici.png";
const hdfcLogo = "/img/hdfc.png";
const axisLogo = "/img/axis.png";
const bobLogo = "/img/bob.png";
const kotakLogo = "/img/kotck.png";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, totalAmount } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP
  const [selectedBank, setSelectedBank] = useState("");
  const [netBankingDetails, setNetBankingDetails] = useState({
    username: "",
    password: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [cardOtp, setCardOtp] = useState("");
  const [upiDetails, setUpiDetails] = useState({ upiId: "" });
  const [upiOtp, setUpiOtp] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [walletDetails, setWalletDetails] = useState({
    username: "",
    password: "",
  });
  const [qrScanned, setQrScanned] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // Track payment status

  const states = ["Rajasthan"];
  const offices = [
    { state: "Rajasthan", name: "Jodhpur, main office", mobile: "9123456789" },
    { state: "Rajasthan", name: "Jaipur, main office", mobile: "9234567890" },
    { state: "Rajasthan", name: "Ajmer, main office", mobile: "9345678901" },
  ];

  const banks = [
    { name: "State Bank of India", value: "SBI", logo: sbiLogo },
    { name: "ICICI Bank", value: "ICICI", logo: iciciLogo },
    { name: "HDFC Bank", value: "HDFC", logo: hdfcLogo },
    { name: "Axis Bank", value: "AXIS", logo: axisLogo },
    { name: "Bank of Baroda", value: "BOB", logo: bobLogo },
    { name: "Kotak Mahindra Bank", value: "KOTAK", logo: kotakLogo },
  ];

  const wallets = [
    { name: "Paytm", value: "Paytm" },
    { name: "PhonePe", value: "PhonePe" },
    { name: "Google Pay", value: "Google Pay" },
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setSelectedBank("");
    setNetBankingDetails({ username: "", password: "" });
    setCardDetails({ cardNumber: "", expiry: "", cvv: "" });
    setCardOtp("");
    setUpiDetails({ upiId: "" });
    setUpiOtp("");
    setSelectedWallet("");
    setWalletDetails({ username: "", password: "" });
    setQrScanned(false);
    setPaymentStatus("");
    setOtp("");
    setGeneratedOtp("");
    setTimer(59);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedOffice("");
  };

  const handleOfficeSelect = (office) => {
    setSelectedOffice(office);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleCardOtpChange = (e) => {
    setCardOtp(e.target.value);
  };

  const handleUpiDetailsChange = (e) => {
    setUpiDetails({ ...upiDetails, [e.target.name]: e.target.value });
  };

  const handleUpiOtpChange = (e) => {
    setUpiOtp(e.target.value);
  };

  const sendOtp = (mobileNumber) => {
    const generated = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    setGeneratedOtp(generated);
    console.log(`OTP ${generated} sent to ${mobileNumber}`);
    alert(`OTP ${generated} sent to ${mobileNumber}`);
    setTimer(59);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOtp = (type) => {
    if (otp === generatedOtp) {
      setPaymentStatus("success");
      alert("OTP verified! Payment successful.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const resendOtp = (mobileNumber) => {
    sendOtp(mobileNumber);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const handleNetBankingChange = (e) => {
    setNetBankingDetails({
      ...netBankingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleNetBankingSubmit = () => {
    if (netBankingDetails.username && netBankingDetails.password) {
      const mobileNumber = "9123456789"; // Simulated mobile number
      sendOtp(mobileNumber);
    } else {
      alert("Please enter username and password.");
    }
  };

  const handleCardSubmit = () => {
    if (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv) {
      const mobileNumber = "9123456789"; // Simulated mobile number
      sendOtp(mobileNumber);
    } else {
      alert("Please fill in all card details.");
    }
  };

  const handleCardOtpSubmit = () => {
    if (cardOtp === generatedOtp) {
      setPaymentStatus("success");
      alert("Payment successful via Credit/Debit Card!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleUpiSubmit = () => {
    if (upiDetails.upiId) {
      const mobileNumber = "9123456789"; // Simulated mobile number
      sendOtp(mobileNumber);
    } else {
      alert("Please enter a valid UPI ID.");
    }
  };

  const handleUpiOtpSubmit = () => {
    if (upiOtp === generatedOtp) {
      setPaymentStatus("success");
      alert("Payment successful via UPI!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
  };

  const handleWalletChange = (e) => {
    setWalletDetails({ ...walletDetails, [e.target.name]: e.target.value });
  };

  const handleWalletSubmit = () => {
    if (walletDetails.username && walletDetails.password) {
      const mobileNumber = "9123456789"; // Simulated mobile number
      sendOtp(mobileNumber);
    } else {
      alert("Please enter username and password.");
    }
  };

  const handleWalletOtpSubmit = () => {
    if (otp === generatedOtp) {
      setPaymentStatus("success");
      alert("Payment successful via Wallet!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleQrScan = () => {
    setQrScanned(true);
    setTimeout(() => {
      setPaymentStatus("success");
      alert("Payment successful via QR!");
    }, 2000); // Simulate QR scan delay
  };

  if (!location.state) {
    return (
      <div className="payment-error">
        <h2>Error</h2>
        <p>Payment details not found. Please go back and try again.</p>
        <Link to="/book" className="back-button">
          BACK
        </Link>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-methods">
        <h2>Online Payment Methods</h2>
        <div
          className={`method-option ${
            selectedMethod === "Net Banking" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("Net Banking")}
        >
          <div className="method-content">
            <img
              src={netBankingIcon}
              alt="Net Banking"
              className="method-icon net-banking-icon"
            />
            <span>Net Banking</span>
          </div>
          <span className="arrow">
            {selectedMethod === "Net Banking" ? "▼" : "▶"}
          </span>
        </div>
        <div
          className={`method-option ${
            selectedMethod === "Credit/Debit Cards" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("Credit/Debit Cards")}
        >
          <div className="method-content">
            <img
              src={cardIcon}
              alt="Credit/Debit Cards"
              className="method-icon card-icon"
            />
            <span>Credit / Debit cards</span>
          </div>
          <span className="arrow">
            {selectedMethod === "Credit/Debit Cards" ? "▼" : "▶"}
          </span>
        </div>
        <div
          className={`method-option ${
            selectedMethod === "QR" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("QR")}
        >
          <div className="method-content">
            <img src={qrIcon} alt="QR" className="method-icon qr-icon" />
            <span>QR</span>
          </div>
          <span className="arrow">{selectedMethod === "QR" ? "▼" : "▶"}</span>
        </div>
        <div
          className={`method-option ${
            selectedMethod === "Wallets" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("Wallets")}
        >
          <div className="method-content">
            <img
              src={walletIcon}
              alt="Wallets"
              className="method-icon wallet-icon"
            />
            <span>Wallets</span>
          </div>
          <span className="arrow">
            {selectedMethod === "Wallets" ? "▼" : "▶"}
          </span>
        </div>
        <div
          className={`method-option ${
            selectedMethod === "UPI" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("UPI")}
        >
          <div className="method-content">
            <img src={upiIcon} alt="UPI" className="method-icon upi-icon" />
            <span>UPI</span>
          </div>
          <span className="arrow">{selectedMethod === "UPI" ? "▼" : "▶"}</span>
        </div>

        <h2>Offline Payment Methods</h2>
        <div
          className={`method-option ${
            selectedMethod === "Cash" ? "selected" : ""
          }`}
          onClick={() => handleMethodSelect("Cash")}
        >
          <div className="method-content">
            <img src={cashIcon} alt="Cash" className="method-icon cash-icon" />
            <span>Cash</span>
          </div>
          <span className="arrow">{selectedMethod === "Cash" ? "▼" : "▶"}</span>
        </div>
      </div>

      <div className="payment-details-section">
        <div className="total-amount-section">
          <h2>Total Payable Amount: ₹{totalAmount?.toFixed(2) || "0.00"}</h2>
        </div>

        {selectedMethod === "Net Banking" && (
          <div className="method-details">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via Net Banking.</p>
              </div>
            ) : (
              <>
                <h3>Select Bank for Net Banking</h3>
                <div className="bank-logos">
                  {banks.map((bank, index) => (
                    <div
                      key={index}
                      className={`bank-logo-container ${
                        selectedBank === bank.value ? "selected" : ""
                      }`}
                      onClick={() => handleBankSelect(bank.value)}
                    >
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="bank-logo"
                      />
                    </div>
                  ))}
                </div>
                {selectedBank && (
                  <>
                    {generatedOtp ? (
                      <div className="otp-section">
                        <h3>Verify OTP</h3>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={handleOtpChange}
                        />
                        <button
                          className="verify-button"
                          onClick={() => verifyOtp("netbanking")}
                        >
                          Verify OTP
                        </button>
                        <button
                          className="resend-button"
                          onClick={() => resendOtp("9123456789")}
                          disabled={timer > 0}
                        >
                          Resend OTP
                        </button>
                        <span className="timer">{`09:${
                          timer < 10 ? `0${timer}` : timer
                        }`}</span>
                      </div>
                    ) : (
                      <>
                        <h3>
                          Login to{" "}
                          {
                            banks.find((bank) => bank.value === selectedBank)
                              ?.name
                          }
                        </h3>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={netBankingDetails.username}
                          onChange={handleNetBankingChange}
                        />
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={netBankingDetails.password}
                          onChange={handleNetBankingChange}
                        />
                        <button
                          className="proceed-button"
                          onClick={handleNetBankingSubmit}
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {selectedMethod === "Credit/Debit Cards" && (
          <div className="method-details">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via Credit/Debit Card.</p>
              </div>
            ) : (
              <>
                <h3>Enter Card Details</h3>
                {generatedOtp ? (
                  <div className="otp-section">
                    <h3>Verify OTP</h3>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={cardOtp}
                      onChange={handleCardOtpChange}
                    />
                    <button
                      className="verify-button"
                      onClick={handleCardOtpSubmit}
                    >
                      Verify OTP
                    </button>
                    <button
                      className="resend-button"
                      onClick={() => resendOtp("9123456789")}
                      disabled={timer > 0}
                    >
                      Resend OTP
                    </button>
                    <span className="timer">{`09:${
                      timer < 10 ? `0${timer}` : timer
                    }`}</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                    />
                    <div className="card-details">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        className="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardDetailsChange}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        className="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                      />
                    </div>
                    <button
                      className="proceed-button"
                      onClick={handleCardSubmit}
                    >
                      Proceed to Pay
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {selectedMethod === "QR" && (
          <div className="method-details">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via QR.</p>
              </div>
            ) : (
              <>
                <h3>Scan QR Code to Pay</h3>
                {!qrScanned ? (
                  <>
                    <div className="qr-placeholder">QR Code Placeholder</div>
                    <p>
                      Scan the QR code using your mobile banking app to pay.
                    </p>
                    <button className="proceed-button" onClick={handleQrScan}>
                      I have scanned the QR code
                    </button>
                  </>
                ) : (
                  <p>Processing payment...</p>
                )}
              </>
            )}
          </div>
        )}

        {selectedMethod === "Wallets" && (
          <div className="method-details">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via Wallet.</p>
              </div>
            ) : (
              <>
                <h3>Select Wallet</h3>
                {!selectedWallet ? (
                  <div className="dropdown">
                    <select
                      onChange={(e) => handleWalletSelect(e.target.value)}
                    >
                      <option value="">Select Wallet</option>
                      {wallets.map((wallet, index) => (
                        <option key={index} value={wallet.value}>
                          {wallet.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : generatedOtp ? (
                  <div className="otp-section">
                    <h3>Verify OTP</h3>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                    <button
                      className="verify-button"
                      onClick={handleWalletOtpSubmit}
                    >
                      Verify OTP
                    </button>
                    <button
                      className="resend-button"
                      onClick={() => resendOtp("9123456789")}
                      disabled={timer > 0}
                    >
                      Resend OTP
                    </button>
                    <span className="timer">{`09:${
                      timer < 10 ? `0${timer}` : timer
                    }`}</span>
                  </div>
                ) : (
                  <>
                    <h3>Login to {selectedWallet}</h3>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={walletDetails.username}
                      onChange={handleWalletChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={walletDetails.password}
                      onChange={handleWalletChange}
                    />
                    <button
                      className="proceed-button"
                      onClick={handleWalletSubmit}
                    >
                      Pay Now
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {selectedMethod === "UPI" && (
          <div className="method-details">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via UPI.</p>
              </div>
            ) : (
              <>
                <h3>Enter UPI ID</h3>
                {generatedOtp ? (
                  <div className="otp-section">
                    <h3>Verify OTP</h3>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={upiOtp}
                      onChange={handleUpiOtpChange}
                    />
                    <button
                      className="verify-button"
                      onClick={handleUpiOtpSubmit}
                    >
                      Verify OTP
                    </button>
                    <button
                      className="resend-button"
                      onClick={() => resendOtp("9123456789")}
                      disabled={timer > 0}
                    >
                      Resend OTP
                    </button>
                    <span className="timer">{`09:${
                      timer < 10 ? `0${timer}` : timer
                    }`}</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="example@upi"
                      value={upiDetails.upiId}
                      onChange={handleUpiDetailsChange}
                    />
                    <button
                      className="proceed-button"
                      onClick={handleUpiSubmit}
                    >
                      Proceed to Pay
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {selectedMethod === "Cash" && (
          <div className="method-details cash-payment">
            {paymentStatus === "success" ? (
              <div className="payment-success">
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment via Cash.</p>
              </div>
            ) : (
              <>
                <h3>Select the office name where you pay payment in cash</h3>
                <div className="dropdown">
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateSelect(e.target.value)}
                  >
                    <option value="">Select state (rajasthan)</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedState && (
                  <div className="dropdown">
                    <select
                      value={selectedOffice}
                      onChange={(e) => handleOfficeSelect(e.target.value)}
                    >
                      <option value="">
                        Select office in state (rajasthan)
                      </option>
                      {offices
                        .filter((office) => office.state === selectedState)
                        .map((office, index) => (
                          <option key={index} value={office.name}>
                            {office.name} (click and send OTP to office)
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {selectedOffice && (
                  <div className="otp-section">
                    <input
                      type="text"
                      placeholder="(Fill OTP here)"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                    <button
                      className="verify-button"
                      onClick={() => verifyOtp("cash")}
                    >
                      Verify OTP
                    </button>
                    <button
                      className="resend-button"
                      onClick={() =>
                        resendOtp(
                          offices.find(
                            (office) => office.name === selectedOffice
                          )?.mobile
                        )
                      }
                      disabled={timer > 0}
                    >
                      Resend OTP
                    </button>
                    <span className="timer">{`09:${
                      timer < 10 ? `0${timer}` : timer
                    }`}</span>
                    <div className="otp-links">
                      <span>Call to office for know OTP</span>
                      <span>View office mobile no.</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
