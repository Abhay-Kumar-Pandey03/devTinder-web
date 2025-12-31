import React from "react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-base-100 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

                <p className="mb-6 text-base-content/80">
                    If you have any questions, feedback, or need support, feel free to reach out to us.
                    We’ll do our best to respond as quickly as possible.
                </p>

                <div className="space-y-3 text-base-content">
                    <p>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:support@devtinder.me"
                            className="link link-hover"
                        >
                            support@devtinder.me
                        </a>
                    </p>

                    <p>
                        <strong>Phone:</strong> +91-7067965169
                    </p>

                    <p>
                        <strong>Address:</strong> India
                    </p>
                </div>

                <p className="mt-8 text-sm text-base-content/60">
                    Support Hours: Monday – Friday, 10:00 AM – 6:00 PM IST
                </p>
            </div>
        </div>
    );
};

export default Contact;
