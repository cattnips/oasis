import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, ErrorBoundary, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import BoxDemo from './components/BoxDemo'
import AssetLoader from './components/AssetLoader'


function Loading() {
  console.log('fallback called');
  return (null);
}

export default class App extends React.Component{
  render(){
    return(
      <Canvas>
        <Suspense fallback = {<Loading />}>
            <AssetLoader path={require('./assets_3d/room.gltf')}></AssetLoader>
         </Suspense>
         
         <ambientLight />
         <pointLight position={[10, 10, 10]} />
         <BoxDemo position={[1.2, 0, 0]} />
      </Canvas>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

