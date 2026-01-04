import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";


const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyIsPremium();
    }, []);

    const verifyIsPremium = async () => {
        try {

            const res = await axios.get(BASE_URL + "/premium/verify", {
                withCredentials: true,
            });

            if (res.data.isPremium) {
                setIsUserPremium(true);
            }
        }
        catch (err) {
            console.error("Error verifying premium status:", err);
        }
    }

    const handleBuyClick = async (type) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", {
                membershipType: type,
            },
                {
                    withCredentials: true,
                });

            //It should open the Razorpay dialog box
            const { amount, currency, orderId, notes, receipt, keyId } = order.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'Dev Tinder',
                description: 'Connecting Developers Worldwide',
                order_id: orderId,
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.emailId,
                    contact: '9999999999'
                },

                theme: {
                    color: '#F37254'
                },

                handler: () => {
                    setTimeout(() => {
                        verifyIsPremium();
                    }, 1500); // wait for webhook
                }

            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (err) {
            console.error("Error initiating payment:", err);
        }
    };
    return (
        isUserPremium ?
            "You are already a premium member!" :
            (
                <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">

                        {/* SILVER CARD */}
                        <div className="card bg-base-100 shadow-xl border  h-full">
                            <div className="card-body flex flex-col h-full">

                                {/* HEADER */}
                                <div>
                                    <h2 className="card-title text-2xl font-bold">Silver Membership</h2>
                                    <p className="text-sm text-gray-500">
                                        Perfect for getting started with premium features.
                                    </p>
                                </div>

                                {/* PRICE (aligned) */}
                                <div className="mt-6">
                                    <span className="text-3xl font-bold">₹199</span>
                                    <span className="text-sm text-gray-500 ml-1">/ month</span>
                                </div>

                                {/* FEATURES */}
                                <ul className="mt-6 space-y-2 text-sm flex-grow">
                                    <li>✔ Access to basic premium features</li>
                                    <li>✔ Limited profile visibility</li>
                                    <li>✔ Standard support</li>
                                </ul>

                                {/* BUTTON (always bottom) */}
                                <div className="flex justify-center">
                                    <button
                                        className="btn btn-primary px-10"
                                        onClick={() => handleBuyClick("silver")}
                                    >
                                        Choose Silver
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* GOLD CARD */}
                        <div className="card bg-base-100 shadow-xl border  h-full">
                            <div className="card-body flex flex-col h-full">

                                {/* HEADER */}
                                <div>
                                    <h2 className="card-title text-2xl font-bold">
                                        Gold Membership
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Best for power users who want full access.
                                    </p>
                                </div>

                                {/* PRICE (aligned) */}
                                <div className="mt-6">
                                    <span className="text-3xl font-bold">₹399</span>
                                    <span className="text-sm text-gray-500 ml-1">/ month</span>
                                </div>

                                {/* FEATURES */}
                                <ul className="mt-6 space-y-2 text-sm flex-grow">
                                    <li>✔ All Silver features</li>
                                    <li>✔ Unlimited profile visibility</li>
                                    <li>✔ Priority support</li>
                                    <li>✔ Early access to new features</li>
                                </ul>

                                {/* BUTTON (always bottom) */}
                                <div className="flex justify-center">
                                    <button
                                        className="btn btn-secondary px-10"
                                        onClick={() => handleBuyClick("gold")}
                                    >
                                        Choose Gold
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )
    );
};

export default Premium;
