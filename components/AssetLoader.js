import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, ErrorBoundary } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

  function AssetLoader(path) {
    console.log('AssetLoader function has been called')
    console.log(useLoader(GLTFLoader, path.path));
  
    const gltf = useLoader(GLTFLoader, path.path);
    // console.log(nodes);
    return (
      <primitive object={gltf.scene}></primitive>
    )
  }

  export default AssetLoader;