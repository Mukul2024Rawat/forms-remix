import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define types for form data
interface FormData {
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    mobile?: string;
    password?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    dob?: string;
    academicDetails?: string;
}

const Information: React.FC = () => {
    const [uncontrolledForms, setUncontrolledForms] = useState<FormData[]>([]);
    const [controlledForms, setControlledForms] = useState<FormData[]>([]);
    const [multiStepForms, setMultiStepForms] = useState<FormData[]>([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const uncontrolledData = await axios.get<FormData[]>('http://localhost:3000/uncontrolledForms');
                const controlledData = await axios.get<FormData[]>('http://localhost:3000/controlledForms');
                const multiStepData = await axios.get<FormData[]>('http://localhost:3000/multiStepForms');

                setUncontrolledForms(uncontrolledData.data);
                setControlledForms(controlledData.data);
                setMultiStepForms(multiStepData.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };
        fetchForms();
    }, []);

    return (
        <div>
            <h1>Uncontrolled Forms</h1>
            <div className="grid gap-4">
                {uncontrolledForms.map((form, index) => (
                    <div key={index} className="card">
                        <p>Email: {form.email}</p>
                        <p>Name: {form.firstName} {form.lastName}</p>
                        {/* Add other fields as needed */}
                    </div>
                ))}
            </div>

            <h1>Controlled Forms</h1>
            <div className="grid gap-4">
                {controlledForms.map((form, index) => (
                    <div key={index} className="card">
                        <p>Email: {form.email}</p>
                        <p>Name: {form.firstName} {form.lastName}</p>
                        {/* Add other fields as needed */}
                    </div>
                ))}
            </div>

            <h1>Multi-Step Forms</h1>
            <div className="grid gap-4">
                {multiStepForms.map((form, index) => (
                    <div key={index} className="card">
                        <p>Email: {form.email}</p>
                        <p>Name: {form.firstName} {form.lastName}</p>
                        {/* Add other fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Information;
