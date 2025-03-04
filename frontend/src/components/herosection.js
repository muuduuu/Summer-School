import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sandbox from '../assets/blend/Hut1.glb';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import LogoImage from '../assets/image/blue white am.png';

const HeroSection = () => {
  const mountRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;
    loader.load(Sandbox, (gltf) => {
      model = gltf.scene;
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.metalness = 0.2;
            node.material.roughness = 0.7;
          }
        }
      });
      scene.add(model);
      model.position.set(0, -10, 0);
      model.scale.set(0.5, 0.5, 0.5);
      model.rotation.y = 30 * (Math.PI / 180);
    });

    camera.position.set(0, 5, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (model) {
        model.position.y += (0 - model.position.y) * 0.02;
        
        const targetScale = 2;
        model.scale.x += (targetScale - model.scale.x) * 0.02;
        model.scale.y += (targetScale - model.scale.y) * 0.02;
        model.scale.z += (targetScale - model.scale.z) * 0.02;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <Box sx={{
        position: 'absolute',
        top: { xs: '5%', sm: '8%', md: '10%' },
        left: { xs: '5%', sm: '8%', md: '10%' },
        animation: 'slideInFromLeft 1s ease-out forwards',
        '@keyframes slideInFromLeft': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      }}>
        <img 
          src={LogoImage} 
          alt="ACM Logo" 
          style={{
            width: isMobile ? '200px' : isTablet ? '250px' : '300px',
            height: 'auto',
          }}
        />
      </Box>
      <Box sx={{
        position: 'absolute',
        top: { xs: '30%', sm: '35%', md: '40%' },
        right: { xs: '5%', sm: '8%', md: '10%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-end' },
        gap: { xs: 1, sm: 1.5, md: 2 },
        width: { xs: '90%', sm: 'auto' },
        mx: { xs: 'auto', sm: 0 },
        animation: 'slideIn 1s ease-out forwards',
        '@keyframes slideIn': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      }}>
        <Typography 
          variant={isMobile ? 'h7' : isTablet ? 'h6' : 'h6'} 
          sx={{ 
            color: 'white',
            textAlign: { xs: 'center', sm: 'right' },
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
          }}
        >
          ACM Student Chapter presents
        </Typography>
        <Typography 
          variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'} 
          sx={{ 
            color: 'white',
            textAlign: { xs: 'center', sm: 'right' },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          ACM Summer School
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
