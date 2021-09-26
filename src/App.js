import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import logo from '../src/images/spaceArmor.svg';
import './App.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'A GSAP3 + React Tutorial', 
    subtitle: 'A project built with React And GSAP3 javaScript animation library, in this tutorial I will get you all setup by creating a react application and installing gsap with you step by step.',
  },
  {
    title: 'ScrollTrigger Magic', 
    subtitle: 'In this course we will go over how to utilize the amazing power of GSAP3 ScrollTrogger Plugin by importing it into our React application'
  },
  {
    title: 'GSAP3 MotionPath Plugin', 
    subtitle: 'This is simply amazig to me. Do you know how to draw an SVG path? Well, if you do, you now have the power to move animations along whatever path you yourself can draw with simple path data. I have a class on those too!'
  }
];

const App = () => {

  const [background, setBackground] = useState('black');
  const headerRef = useRef(null);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const toggleBackground = () => {
    const color = background !== '#262626' ? '#262626' : '#478a52';
    setBackground(color);
  }

  useEffect(() => {

    gsap.to(headerRef.current, { backgroundColor: background, duration: 1,  ease: 'none' });

  }, [background]);

  useEffect(() => {
    
    gsap.from(headerRef.current, {
      autoAlpha: 0, 
      ease: 'back',
      duration: 4,
      delay: 1
    });

    revealRefs.current.forEach((el, index) => {
        
      gsap.fromTo(el, {
        autoAlpha: 0
      }, {
        duration: 1, 
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          id: `section-${index+1}`,
          trigger: el,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

    });

  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
        revealRefs.current.push(el);
    }
  };

  return (
    <div className="App">
      <header ref={headerRef} className="App-header">
      
      <h1>A Beginner's guide to using GSAP in a React application</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <h4>A straight forward documented walkthrough</h4>
      <h2 className="author">Written By: Jason Nutt</h2>
      <p>
         ScrollTrigger allows us to reveal Content as we scroll
        </p>
        
        <button onClick={() => toggleBackground()}>Change background</button>
        
        <p>
         GSAP3 gives us an extreme amount of custom features as well as doing the simple things flawlessly!
        </p>
      </header>
      <main className="App-main">
        {
          sections.map(({title, subtitle}) => (
            <div className="App-section" key={title} ref={addToRefs}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;