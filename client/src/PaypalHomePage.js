import React, { useState } from "react";
import Paypal from "./components/PayPal";
import "./PaypalHP.css";

function PaypalHomePage() {
  // PayPal Checkout
  const [checkOut, setCheckOut] = useState(true); // Set to true by default

  return (
    <div className="Paypal">
      {checkOut ? (
        <Paypal />
      ) : null}
    </div>
  );
}

export default PaypalHomePage;
