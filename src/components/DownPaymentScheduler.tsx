import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface DownPaymentSchedulerProps {
  onSubmit: () => void;
}

interface FormData {
  downPaymentAmount: number;
  paymentDate: string;
}

export const DownPaymentScheduler: React.FC<DownPaymentSchedulerProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmitForm = (data: FormData) => {
    console.log(data);
    onSubmit();
  };

  return (
    <motion.div 
      className="glassmorphism p-6 rounded-lg shadow-lg mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 holographic-text">Schedule Down Payment</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label htmlFor="downPaymentAmount" className="block mb-1 text-sm">Down Payment Amount ($)</label>
          <input
            type="number"
            id="downPaymentAmount"
            {...register('downPaymentAmount', { required: 'Down payment amount is required', min: { value: 1, message: 'Minimum down payment is $1' } })}
            className="w-full p-2 border rounded bg-gray-700 bg-opacity-50 text-white"
          />
          {errors.downPaymentAmount && <span className="text-red-400 text-sm">{errors.downPaymentAmount.message}</span>}
        </div>
        <div>
          <label htmlFor="paymentDate" className="block mb-1 text-sm">Payment Date</label>
          <input
            type="date"
            id="paymentDate"
            {...register('paymentDate', { required: 'Payment date is required' })}
            className="w-full p-2 border rounded bg-gray-700 bg-opacity-50 text-white"
          />
          {errors.paymentDate && <span className="text-red-400 text-sm">{errors.paymentDate.message}</span>}
        </div>
        <motion.button 
          type="submit" 
          className="w-full bg-blue-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Schedule Down Payment
        </motion.button>
      </form>
    </motion.div>
  );
};