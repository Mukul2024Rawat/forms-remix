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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/controlledForms', formData);
    };

    return (
        <div className="container bg-gray-100 p-6 rounded-md">
            <h1 className="text-center text-2xl font-bold mb-6">Controlled Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required className="input w-full p-2 border rounded-md">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mobile:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required className="input w-full p-2 border rounded-md"></textarea>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Pincode:</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input w-full p-2 border rounded-md"/>
                </div>
                <button type="submit" className="btn w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
            </form>
        </div>
    );
};

export default ControlledForm;
