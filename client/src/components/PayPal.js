import React, { useRef, useEffect, useState } from 'react';
import './paypal.css'

export default function Paypal() {
    const paypal = useRef();
    const [donationAmount, setDonationAmount] = useState(1.00); // Default donation amount
    const [paypalButton, setPaypalButton] = useState(null);

    useEffect(() => {
        if (!paypalButton) {
            // Initialize the PayPal button when the component mounts
            const buttonInstance = window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Thank you for your Support",
                                amount: {
                                    currency_code: "USD",
                                    value: donationAmount // Use the selected donation amount
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                }
            });

            setPaypalButton(buttonInstance);

            // Render the PayPal button inside the container
            buttonInstance.render(paypal.current);
        } else {
            // Update the donation amount when it changes
            paypalButton.updateProps({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Thank you for your Support",
                                amount: {
                                    currency_code: "USD",
                                    value: donationAmount // Use the selected donation amount
                                }
                            }
                        ]
                    });
                }
            });
        }
    }, [donationAmount, paypalButton]); // Re-render the button when the donation amount changes

    // Event handler to update the donation amount when the user enters a new value
    const handleDonationAmountChange = (event) => {
        setDonationAmount(parseFloat(event.target.value).toFixed(2));
    };

    return (
        <div className='paypal-div'>
            {/* Input field for the user to enter the donation amount */}
            <h3>Please enter the amount you will like to give and a payment method!</h3>
            <input
                type="number"
                step="1.00"
                min="1.00"
                className='paypalValue'
                value={donationAmount}
                onChange={handleDonationAmountChange}
            />
            <div ref={paypal}></div>
        </div>
    );
}
