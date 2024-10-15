import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { BookingForm } from './components/BookingForm';
import { PaymentForm } from './components/PaymentForm';
import { UserProfile } from './components/UserProfile';
import { DownPaymentScheduler } from './components/DownPaymentScheduler';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stripePromise = loadStripe('your_stripe_publishable_key');

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDownPaymentScheduler, setShowDownPaymentScheduler] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowSidebar(true);
    setShowDownPaymentScheduler(false);
    setShowPaymentForm(false);
  };

  const handleBookingSubmit = (details: any) => {
    setBookingDetails(details);
    setShowDownPaymentScheduler(true);
  };

  const handleDownPaymentSubmit = (downPaymentDetails: any) => {
    console.log('Down Payment Details:', downPaymentDetails);
    setShowPaymentForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <motion.header 
        className="glassmorphism p-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold holographic-text">Futuristic Booking</h1>
        <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden">
          {showSidebar ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <motion.main 
          className="flex-grow holographic p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Calendar onSelectDate={handleDateSelect} />
        </motion.main>
        <AnimatePresence>
          {showSidebar && (
            <motion.aside 
              className={`w-full md:w-96 holographic p-4 overflow-y-auto fixed md:static right-0 top-0 h-full md:h-auto`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <UserProfile />
              {selectedDate && !showDownPaymentScheduler && !showPaymentForm && (
                <BookingForm selectedDate={selectedDate} onSubmit={handleBookingSubmit} />
              )}
              {showDownPaymentScheduler && (
                <DownPaymentScheduler onSubmit={handleDownPaymentSubmit} />
              )}
              {showPaymentForm && (
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;