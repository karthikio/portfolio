import React, { useState } from 'react';
import { db, storage } from '../firebase/firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { login, logout } from '../firebase/auth';
import '../styles/Admin.css';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(''); 
  const [about, setAbout] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    const user = await login(email, password);
    if (user) setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return;

    // Upload image to Firebase storage
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    // Add article data to Firestore, including the new body field
    await addDoc(collection(db, 'articles'), {
      title,
      about,
      link,
      imageURL,
      body, 
      date: Timestamp.now(),
    });

    // Clear the form fields
    setTitle('');
    setLink('');
    setImage(null);
    setBody(''); 
    setAbout('');
  };

  return (
    <div className="admin">
      {!isAuthenticated ? (
        <div className="login-form">
          <h1>Admin Login</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h1>Publish a New Article</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title"
              required
            />
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Give a short description..."
              rows="3"
              required
            ></textarea>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Article Link"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your article body here..."
              rows="6"
            ></textarea>
            <button type="submit">Publish Article</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;