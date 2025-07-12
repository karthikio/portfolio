import React, { useState, useRef } from 'react';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isButton, setIsButton] = useState(false);
  const [emailError, setEmailError] = useState('');
  const formRef = useRef();

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButton(true);
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setIsButton(false);
      return;
    } else {
      setEmailError('');
    }

    try {
      // Save to Firebase
      await addDoc(collection(db, 'contact'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      // Send email using EmailJS
      // Replace these with your actual EmailJS service, template, and user IDs
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      );

      setName('');
      setEmail('');
      setMessage('');
      alert('Message Sent! Thank you for reaching out.');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsButton(false);
    }
  };

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p>
        I'd love to hear from you! Whether you have a project you'd like to discuss, a collaboration in mind, or just want to say hello, feel free to reach out.
      </p>
      <br/>
      <p>
        I'll get back to you as soon as possible! Looking forward to connecting with you.
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="user_name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Your Name" 
          required 
        />
        <div className="email-field">
          <input 
            type="email" 
            name="user_email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value) ? setEmailError('') : null;
            }} 
            placeholder="Your Email" 
            required 
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <textarea 
          name="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Your Message" 
          required 
        />
        <input type="hidden" name="recipient_email" value="developer.karthiksanthosh@gmail.com" />
        <button 
          className='btn' 
          disabled={isButton} 
          type="submit"
        >
          {isButton ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;