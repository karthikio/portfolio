import React from 'react';
import '../styles/Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-top">
        <div className="home-intro">
          <h1>I'm Karthik Santhosh</h1>
          <p>
            Just 21. I love to build responsive, and creative web and mobile applications.
          </p>
          <p>Explore my work and feel free to connect through the links below!
          </p>
          <span className='home-links'>
          <a target="_blank" rel="noreferrer" href="https://github.com/karthikio"><img alt='github' className='link'  src="/images/github.png" /></a>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/karthik-santhosh-321299275/"><img alt='linkedIn' className='link'  src="/images/linkedin.png" /></a>
          <a href="mailto:developer.karthiksanthosh@gmail.com"><img className='link' alt='mail'  src="/images/email.png" /></a>
          </span>
        </div>
        <div className="home-profile">
          <img className='home-image' src="/images/karthik-profile.jpg" alt="Karthik Santhosh" />
        </div>
      </div>

      <div className="home-content-bottom">
        <h2>About Me</h2>
        <p>
        Hi, I'm Karthik Santhosh—a passionate Full-Stack Web Developer and iOS Developer with a strong foundation in Computer Science. I specialize in creating seamless and user-friendly web and mobile applications that not only meet but exceed client expectations. Currently pursuing my MCA, I bring a blend of technical expertise and creativity to every project I undertake.
        </p>
        <br/>
        <p>Explore my portfolio to see some of the projects I've worked on, learn more about my skills, and find out how I can help bring your next idea to life.</p>

        <h2>Skills</h2>
        <ul>
          <li>- python & django</li>
          <li>- javaScript</li>
          <li>- iOS Development (Swift, SwiftUI)</li>
          <li>- Full Stack Web Development (React, Node.js, MongoDB, Express.js)</li>
          <li>- Version Control (Git, GitHub)</li>
          <li>- Firebase</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;