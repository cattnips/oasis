import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, ErrorBoundary, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useFrame, render } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import BoxDemo from './components/BoxDemo'
import { Mesh, PointLight, Scene } from 'three';
// import AssetLoader from './components/AssetLoader'

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

function AssetLoader(props) {
  // return an array of primitives

  const gltf = useLoader(GLTFLoader, props.path);
  const gltfObjects = gltf.scene.children;
  var sceneObjects = [];

  console.log(gltfObjects);

  gltfObjects.map( object => {
    console.log(object.type);

    switch (object.type.toString()){
      case 'Object3D':
        console.log(object)


        // IF HAS CHILDREN
        if (!object.children.length > 0){
          if (object.name.substring(0, 5) == 'Empty'){
          console.log('found empty')
        }
        } else {
          // iterate through children, figure out what non-mesh it is by context clues (and code lol)
          console.log('OBJECT CHILDREN: ' + object.children)
        }
        
        if (object.name.substring(5) == 'Point'){
          console('found point light')
        }
        break;
      case 'Mesh':
        console.log('found mesh')
      break;
      default:
        // console.log('type' + object.children[0] + 'not found')
      break;
    }

    sceneObjects.push(
      <primitive object={object} key={object.uuid}></primitive>
    )}
  );

  return(sceneObjects);
}

function parseGltfObject(object){
  // switch(objectArray.name){}
  console.log(object);
}

function Loading() {
  console.log('fallback called');
  return (null);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});