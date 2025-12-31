const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-base-100 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                <p className="mb-4">
                    At DevTinder, we respect your privacy and are committed to protecting
                    your personal information.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
                <p className="mb-4">
                    We may collect personal details such as your name, email address,
                    profile information, and payment-related details.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Use of Information</h2>
                <p className="mb-4">
                    The collected information is used to provide services, process payments,
                    improve user experience, and communicate important updates.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Payment Security</h2>
                <p className="mb-4">
                    All payments are securely processed through Razorpay. DevTinder does not
                    store your card, UPI, or banking information.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
                <p className="mb-4">
                    We implement reasonable security measures to protect your personal data
                    from unauthorized access or disclosure.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
                <p>
                    For privacy-related concerns, please contact us at
                    <strong> support@devtinder.me</strong>.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
