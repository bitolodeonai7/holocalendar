import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface BookingFormProps {
  selectedDate: Date;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  service: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <motion.div 
      className="glassmorphism p-6 rounded-lg shadow-lg mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 holographic-text">Book an Appointment</h2>
      <p className="mb-4 text-blue-300">Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</p>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded bg-gray-700 bg-opacity-50 text-white"
          />
          {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            className="w-full p-2 border rounded bg-gray-700 bg-opacity-50 text-white"
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="service" className="block mb-1 text-sm">Service</label>
          <select
            id="service"
            {...register('service', { required: 'Service is required' })}
            className="w-full p-2 border rounded bg-gray-700 bg-opacity-50 text-white"
          >
            <option value="">Select a service</option>
            <option value="consultation">Consultation</option>
            <option value="treatment">Treatment</option>
            <option value="followup">Follow-up</option>
          </select>
          {errors.service && <span className="text-red-400 text-sm">{errors.service.message}</span>}
        </div>
        <motion.button 
          type="submit" 
          className="w-full bg-blue-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Down Payment
        </motion.button>
      </form>
    </motion.div>
  );
};