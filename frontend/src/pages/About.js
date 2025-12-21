import React from "react";

export default function About() {
  return (
    <div className="min-h-screen p-6 text-gray-900 bg-blue-50 md:p-10">
      <section className="flex flex-col items-center max-w-4xl mx-auto space-y-8 text-center">

        {/* Main Title */}
        <h2 className="px-6 py-3 text-3xl font-bold text-white rounded-lg shadow-lg md:text-4xl bg-gradient-to-r from-blue-600 to-blue-800">
          Bhola Enterprises
        </h2>

        {/* Image */}
        <img
          src="/logo.jpeg"
          alt="Logo"
          className="w-24 rounded-full shadow-lg md:w-32"
        />

        {/* Owner Name */}
        <h3 className="text-2xl font-extrabold tracking-wide text-gray-800 uppercase md:text-3xl">
          Satendra Kumar
        </h3>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
          >
            <i className="mr-2 fa fa-linkedin"></i>
            LinkedIn
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
          >
            <i className="mr-2 fa fa-facebook"></i>
            Facebook
          </a>

          <a
            href="mailto:prasadbanshi123@gmail.com"
            className="px-5 py-2 text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
          >
            <i className="mr-2 fa fa-envelope"></i>
            Email
          </a>
        </div>

        {/* About Content */}
        <div className="space-y-6 text-justify">
          <h4 className="text-lg font-semibold text-blue-800 md:text-xl">
            Introducing Bhola Enterprises
          </h4>

          <div className="space-y-4 leading-relaxed text-gray-700">
            <p>
              Bhola Enterprises is your one-stop destination for all your
              electronic needs. From sales to service, we are committed to
              providing top-quality products and expert support.
            </p>

            <h5 className="px-6 py-3 text-xl font-bold text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-800">
              Trusted Electronics Destination
            </h5>

            <h5 className="text-lg font-semibold text-blue-800">Our Products</h5>
            <p>
              Smartphones, laptops, cameras, audio systems, accessories, and
              more from trusted brands.
            </p>

            <h5 className="text-lg font-semibold text-blue-800">Our Services</h5>
            <p>
              Professional repair and maintenance services by skilled
              technicians.
            </p>

            <h5 className="text-lg font-semibold text-blue-800">
              Customer Satisfaction
            </h5>
            <p>
              A trusted name in the community with hundreds of satisfied
              customers.
            </p>
          </div>
        </div>

        {/* ✅ MAP SECTION — WORKS LIKE FIRST CODE */}
        <div className="w-full h-64 mt-8 overflow-hidden rounded-lg shadow-lg md:h-96">
          <iframe
            title="Bhola Enterprises Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.640284036118!2d83.9364526!3d25.5717843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992e5c8b5f6d4a5%3A0x123456789abcdef!2sBhola%20Enterprises%2C%20Buxar!5e0!3m2!1sen!2sin!4v1733760000000"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Open in Google Maps Button */}
        <a
          href="https://maps.app.goo.gl/pNh7nbMMewECajeH9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          📍 Open in Google Maps
        </a>

      </section>
    </div>
  );
}
