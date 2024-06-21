import React, { useState } from 'react';
import axios from 'axios';

const ControlledForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        mobile: '',
        password: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        dob: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors: any = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
        if (formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters";
        if (!/^[0-9]{10}$/.test(formData.mobile)) tempErrors.mobile = "Mobile should be 10 digits";
        if (!/^[0-9]{6}$/.test(formData.pincode)) tempErrors.pincode = "Pincode should be 6 digits";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('http://localhost:3000/controlledForms', formData);
                alert('Form submitted successfully!');
            } catch (error) {
                alert('Error submitting form. Please try again.');
            }
        }
    };

    return (
        <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Registration Form</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Mobile:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                <div className="form-group md:col-span-2">
                    <label className="block text-gray-700 mb-2">Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Pincode:</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 mb-2">Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <button type="submit" className="md:col-span-2 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Submit</button>
            </form>
        </div>
    );
};

export default ControlledForm;