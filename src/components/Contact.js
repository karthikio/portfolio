import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import '../styles/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isButton, setIsButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButton(true); 

    try {
      await addDoc(collection(db, 'contact'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setName('');
      setEmail('');
      setMessage('');
      alert('Message Sent!');
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
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" required />
        <button disabled={isButton} type="submit">{isButton ? 'Sending...' : 'Send Message'}</button>
      </form>
    </div>
  );
};

export default Contact;