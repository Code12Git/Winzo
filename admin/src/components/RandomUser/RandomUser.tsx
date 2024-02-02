'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { privateRequest } from '@/helpers/axios';
import toast from 'react-hot-toast';
interface FormData {
  name: string;
  won: string;
}

const RandomUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    won: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await privateRequest.post('/randomuser', formData);

      if (response.status === 201) {
        console.log('User created successfully:', response.data);
        toast.success('User created successfully')
      } else {
        console.error('Failed to create user:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Random User Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="won" className="block text-sm font-medium text-gray-700">
              Won
            </label>
            <input
              type="text"
              id="won"
              name="won"
              value={formData.won}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RandomUser;
