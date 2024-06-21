import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(1);
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
        dob: '',
        academicDetails: ''
    });
    const [emailExists, setEmailExists] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1) {
            checkEmailExists(formData.email);
        } else {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/multiStepForms', formData);
            alert('Form submitted successfully!');
            // Reset form or redirect user
        } catch (error) {
            alert('Error submitting form. Please try again.');
        }
    };

    const checkEmailExists = async (email: string) => {
        try {
            const uncontrolled = await axios.get(`http://localhost:5000/uncontrolledForms?email=${email}`);
            const controlled = await axios.get(`http://localhost:5000/controlledForms?email=${email}`);
            const multiStep = await axios.get(`http://localhost:5000/multiStepForms?email=${email}`);

            if (uncontrolled.data.length > 0 || controlled.data.length > 0 || multiStep.data.length > 0) {
                setEmailExists(true);
            } else {
                setEmailExists(false);
                setStep(step + 1);
            }
        } catch (error) {
            alert('Error checking email. Please try again.');
        }
    };

    useEffect(() => {
        if (emailExists) {
            alert('Email already registered');
        }
    }, [emailExists]);

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Step 1: Account Information</h2>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 mb-4 border rounded"/>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Step 2: Personal Information</h2>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full p-2 mb-4 border rounded"/>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full p-2 mb-4 border rounded"/>
                        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 mb-4 border rounded">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Step 3: Contact Information</h2>
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required className="w-full p-2 mb-4 border rounded"/>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 mb-4 border rounded"/>
                        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 mb-4 border rounded"></textarea>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full p-2 mb-4 border rounded"/>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="w-full p-2 mb-4 border rounded"/>
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Step 4: Additional Information</h2>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="w-full p-2 mb-4 border rounded"/>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2 mb-4 border rounded"/>
                        <textarea name="academicDetails" value={formData.academicDetails} onChange={handleChange} placeholder="Academic Details" required className="w-full p-2 mb-4 border rounded"></textarea>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6">Multi-Step Registration Form</h1>
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-1/4 text-center ${s === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                            Step {s}
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {renderStep()}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                            Previous
                        </button>
                    )}
                    {step < 4 ? (
                        <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MultiStepForm;