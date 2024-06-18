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
        await axios.post('http://localhost:5000/multiStepForms', formData);
    };

    const checkEmailExists = async (email: string) => {
        const uncontrolled = await axios.get(`http://localhost:5000/uncontrolledForms?email=${email}`);
        const controlled = await axios.get(`http://localhost:5000/controlledForms?email=${email}`);
        const multiStep = await axios.get(`http://localhost:5000/multiStepForms?email=${email}`);

        if (uncontrolled.data.length > 0 || controlled.data.length > 0 || multiStep.data.length > 0) {
            setEmailExists(true);
        } else {
            setEmailExists(false);
            setStep(step + 1);
        }
    };

    useEffect(() => {
        if (emailExists) {
            alert('Email already registered');
        }
    }, [emailExists]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
                <>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input"/>
                    <button type="button" onClick={handleNext} className="btn">Next</button>
                </>
            )}
            {step === 2 && (
                <>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="input"/>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="input"/>
                    <select name="gender" value={formData.gender} onChange={handleChange} required className="input">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <button type="button" onClick={handlePrev} className="btn">Previous</button>
                    <button type="button" onClick={handleNext} className="btn">Next</button>
                </>
            )}
            {step === 3 && (
                <>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required className="input"/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="input"/>
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="input"></textarea>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="input"/>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="input"/>
                    <button type="button" onClick={handlePrev} className="btn">Previous</button>
                    <button type="button" onClick={handleNext} className="btn">Next</button>
                </>
            )}
            {step === 4 && (
                <>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="input"/>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input"/>
                    <textarea name="academicDetails" value={formData.academicDetails} onChange={handleChange} placeholder="Academic Details" required className="input"></textarea>
                    <button type="button" onClick={handlePrev} className="btn">Previous</button>
                    <button type="submit" className="btn">Submit</button>
                </>
            )}
        </form>
    );
};

export default MultiStepForm;
