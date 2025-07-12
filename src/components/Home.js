import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const mountRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Show content with delay for animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    
    // THREE.js scene setup
    const currentMount = mountRef.current;
    
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      2000
    );
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
    
    // Create stars (simple approach)
    const starCount = 3000;
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Create stars in a sphere around the camera
      const radius = 50 + Math.random() * 950;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    // Simple point material for stars
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Create several galaxy functions
    const createGalaxy = (x, y, z, color) => {
      const galaxyPoints = 1000;
      const galaxyGeometry = new THREE.BufferGeometry();
      const galaxyPositions = new Float32Array(galaxyPoints * 3);
      const galaxyColors = new Float32Array(galaxyPoints * 3);
      
      const centerColor = new THREE.Color(color.center);
      const edgeColor = new THREE.Color(color.edge);
      
      const arms = 3 + Math.floor(Math.random() * 3);
      const spread = 10;
      
      for (let i = 0; i < galaxyPoints; i++) {
        const i3 = i * 3;
        
        // Calculate arm position
        const radius = Math.random() * spread;
        const spinAngle = radius * 2.5;
        const branchAngle = (i % arms) / arms * Math.PI * 2;
        
        const x = Math.cos(branchAngle + spinAngle) * radius;
        const y = (Math.random() - 0.5) * (radius * 0.3);
        const z = Math.sin(branchAngle + spinAngle) * radius;
        
        galaxyPositions[i3] = x;
        galaxyPositions[i3 + 1] = y;
        galaxyPositions[i3 + 2] = z;
        
        // Color gradient from center to edge
        const mixRatio = radius / spread;
        const starColor = centerColor.clone().lerp(edgeColor, mixRatio);
        
        galaxyColors[i3] = starColor.r;
        galaxyColors[i3 + 1] = starColor.g;
        galaxyColors[i3 + 2] = starColor.b;
      }
      
      galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
      galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));
      
      const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        vertexColors: true
      });
      
      const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
      galaxy.position.set(x, y, z);
      scene.add(galaxy);
      
      return galaxy;
    };
    
    // Create multiple galaxies
    const galaxies = [
      createGalaxy(-15, 8, -30, { center: '#ff9966', edge: '#4444ff' }),
      createGalaxy(20, -5, -40, { center: '#66ffaa', edge: '#6600ff' }),
      createGalaxy(0, -12, -25, { center: '#ffcc33', edge: '#3399ff' })
    ];
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Subtle camera movement based on mouse
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      // Rotate galaxies
      galaxies.forEach((galaxy, index) => {
        const speed = 0.1 + (index * 0.05);
        galaxy.rotation.y = elapsedTime * speed;
        galaxy.rotation.z = elapsedTime * speed * 0.5;
      });
      
      // Rotate star field slowly
      starField.rotation.y = elapsedTime * 0.03;
      
      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeChild(renderer.domElement);
      scene.clear();
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="home-container">
      <div className="threejs-background" ref={mountRef}></div>
      
      <div className={`content-wrapper ${showContent ? 'show' : ''}`}>
        <div className="hero-section">
          <div className="hero-content">
          <h1>Karthik Santhosh</h1>
          <h2 className="tagline">Full-Stack Developer & Freelancer</h2>
          <p className="intro-text">
            I love building responsive and creative web and mobile applications.  
            Crafting immersive digital experiences through code and creativity.
          </p>
          <p className="secondary-text">
            I also take up freelance projects — helping clients turn their ideas into digital products.  
            Explore my work and feel free to connect through the links below!
          </p>
            <div className="home-links">
              <a target="_blank" rel="noreferrer" href="https://github.com/karthikio" className="social-link">
                <img alt="GitHub" className="link-icon" src="/images/github.png" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/karthik-io/" className="social-link">
                <img alt="LinkedIn" className="link-icon" src="/images/linkedin.png" />
              </a>
              <a href="mailto:developer.karthiksanthosh@gmail.com" className="social-link">
                <img alt="Email" className="link-icon" src="/images/email.png" />
              </a>
            </div>
            <div className="cta-buttons">
              <a target='_blank' href="https://github.com/karthikio" className="cta-primary">View Projects</a>
              <Link className="cta-secondary" to="/articles">My posts</Link>
            </div>
          </div>
        </div>
        
        <div className="content-sections">
          <section className="about-section">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <p>
                I'm Karthik Santhosh — a 22-year-old developer with a passion for creating digital experiences that leave an impression. Currently pursuing my MCA, I combine my academic knowledge with hands-on experience to build innovative solutions.
              </p>
              <p>
                My journey in tech is driven by curiosity and a desire to solve complex problems through elegant code. I believe in creating applications that not only function flawlessly but also provide intuitive and engaging user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or experimenting with new development frameworks and tools.
              </p>
            </div>
          </section>
          
          <section className="skills-section">
            <h2 className="section-title">Technical Arsenal</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Frontend Development</h3>
                <ul className="skill-list">
                  <li>React.js</li>
                  <li>JavaScript</li>
                  <li>Three.js</li>
                  <li>HTML5/CSS3/SASS</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Backend Development</h3>
                <ul className="skill-list">
                  <li>Python & Django</li>
                  <li>Node.js & Express</li>
                  <li>MongoDB & PostgreSQL</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Mobile Development</h3>
                <ul className="skill-list">
                  <li>iOS (Swift, SwiftUI)</li>
                  <li>React Native</li>
                  <li>Firebase Integration</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Tools & Practices</h3>
                <ul className="skill-list">
                  <li>Git & GitHub</li>
                  <li>Blender</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="collab-section">
  <h2 className="collab-title">Let's Build Something Amazing Together</h2>
  <p className="collab-text">
    I'm always looking for <span className="collab-highlight">passionate</span> and 
    <span className="collab-highlight"> enthusiastic</span> individuals to collaborate with on 
    real-world projects. If you share my love for creating innovative solutions and want to 
    work on exciting challenges, I'd love to connect and explore opportunities together.
  </p>
  <Link to="/contact" className="collab-button">
    Get in Touch
  </Link>
</section>
        </div>
      </div>
    </div>
  );
};

export default Home;