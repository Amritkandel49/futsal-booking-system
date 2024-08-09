import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../turf.css';
import { useNavigate } from 'react-router-dom';

function RegisterTurf() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('price', Number(price));

    images.forEach((image) => {
      formData.append('images', image); // Use 'images' as the field name
    });

    try {
      const response = await axios.post('http://localhost:8000/api/v1/owners/register-turf', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false); // Set loading to false after request is completed
      if (response.status === 200) {
        alert('Turf registered successfully!');
        navigate('/owner'); // Navigate to the owner dashboard after successful registration
      } else {
        alert('Failed to register turf. Please try again.');
      }

      setName('');
      setLocation('');
      setPrice('');
      setImages([]);

    } catch (error) {
      console.error('Error registering turf:', error);
      setLoading(false); // Set loading to false after request is completed
      alert('Failed to register turf. Please try again.');
    }
  };

  return (
    <>
      <h1 className="text-3xl text-white mb-6">Register Turf</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg text-white">Futsal Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-white">Address*</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-white">Price*</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-white">Upload Photo*</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="w-full text-white border border-gray-300 p-2 rounded"
            multiple // Allow multiple file selection
            required
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader"></div>
          </div>
        )}
      </form>
    </>
  );
}

export default RegisterTurf;
