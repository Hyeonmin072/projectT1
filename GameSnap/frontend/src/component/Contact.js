// src/components/Contact.js
import React from 'react';

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 text-center bg-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
      <p className="mb-4">Feel free to reach out via email or follow me on social media!</p>
      <a href="mailto:example@example.com" className="text-blue-400 underline">example@example.com</a>
    </section>
  );
}

export default Contact;
