import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // Here you would typically send the paymentMethod.id to your server
        // to complete the payment
      }
    }
  };

  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-semibold mb-4 holographic-text">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
        >
          Pay
        </button>
      </form>
    </div>
  );
};