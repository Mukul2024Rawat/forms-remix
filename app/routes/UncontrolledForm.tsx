import React, { useRef } from 'react';
import axios from 'axios';

const UncontrolledForm: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            await axios.post('http://localhost:5000/uncontrolledForms', data);
        }
    };

    return (
        <div className="container bg-gray-100 p-6 rounded-md">
            <h1 className="text-center text-2xl font-bold mb-6">Uncontrolled Form</h1>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" required className="input w-full p-2 border rounded-md">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mobile:</label>
                    <input type="text" name="mobile" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <textarea name="address" required className="input w-full p-2 border rounded-md"></textarea>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" name="state" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Pincode:</label>
                    <input type="text" name="pincode" required className="input w-full p-2 border rounded-md"/>
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" required className="input w-full p-2 border rounded-md"/>
                </div>
                <button type="submit" className="btn w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
            </form>
        </div>
    );
};

export default UncontrolledForm;
