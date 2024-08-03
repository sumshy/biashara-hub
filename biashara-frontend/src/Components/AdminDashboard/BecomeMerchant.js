'use client';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const BecomeMerchant = () => {
    const [session, setSession] = useState(null); // Simulate session state
    const [status, setStatus] = useState('unauthenticated');
    const [licenseId, setLicenseId] = useState('');
    const token = localStorage.getItem('authToken');

    // Simulated function to fetch the session data
    const fetchSession = () => {
        // Replace with actual logic to get the session
        if (token) {
            const mockSession = { user: { token: token, licenseId: 'test' } }; // Mock session data
            setSession(mockSession);
            setStatus('authenticated');
            setLicenseId(mockSession.user.licenseId);
        }
        
    };

    useEffect(() => {
        fetchSession();
    }, []);

    const becomeMerchant = useCallback(async () => {
        if (status === 'authenticated' && session) {
            const response = await fetch('http://localhost:5000/api/merchant/becomeMerchant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify({
                    licenseId: 'test',
                }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                toast.success('You are a merchant now');
                if (result.licenseId) {
                    setLicenseId(result.licenseId);
                    // Update session or state if necessary
                }
            } else {
                toast.error(result.message || 'Unknown error occurred');
            }
        }
    }, [status, session]);

    return (
        <li className="miniNavLink">
            {licenseId ? (
                <Link href="/dashboard">
                    <button className="flex gap-2 items-center">
                        Merchant Dashboard
                    </button>
                </Link>
            ) : (
                <button
                    className="flex gap-2 items-center"
                    onClick={becomeMerchant}
                >
                    Become Merchant
                </button>
            )}
        </li>
    );
};

export default BecomeMerchant;
