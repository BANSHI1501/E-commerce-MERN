import React from 'react';

export default function Contact() {
  const emailAddress = "info@bholaEnterprises.com"; // Email address

  const handleEmailClick = () => {
    // Opens the default email client
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="min-h-screen p-6 text-gray-900 bg-blue-50 md:p-10">
      <section className="flex flex-col items-center space-y-10 text-center">
        {/* Contact Title */}
        <h2 className="px-10 py-3 text-3xl font-bold text-white rounded-lg shadow-lg md:text-4xl bg-gradient-to-r from-blue-700 to-blue-900">
          Contact Us
        </h2>

        {/* Contact Info Section */}
        <div className="max-w-2xl space-y-6 text-gray-700">
          <p className="text-lg">
            Have questions or need help with your electronics? We’d love to hear from you! You can reach us directly via email or phone.
          </p>
          <p className="text-lg">
            You can also reach us via email at{' '}
            <span 
              onClick={handleEmailClick} 
              className="font-semibold text-blue-600 cursor-pointer hover:underline">
              {emailAddress}
            </span>{' '}
            or call us at{' '}
            <span className="font-semibold">+91-9525477284</span>.
          </p>
          <p className="text-lg">
            Visit us at our store:
            <span className="block font-semibold">Bhola Enterprises, station road twwiningganj, Buxar, Bihar India</span>
          </p>
        </div>

        {/* Removed the contact form as requested */}
        
      </section>

      {/* Additional Contact Information */}
      <section className="flex flex-col items-center mt-12 space-y-4 text-gray-700">
        <h3 className="text-2xl font-bold text-blue-800">Our Commitment</h3>
        <p className="max-w-2xl text-center">
          At Bhola Enterprises, we value every customer. Whether you have a question about our products or need support with a recent purchase, our team is here to help. Your satisfaction is our top priority.
        </p>
      </section>
    </div>
  );
}
