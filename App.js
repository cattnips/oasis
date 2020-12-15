import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, ErrorBoundary } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function BoxDemo(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   console.log(mesh);
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  // })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function AssetLoader() {
  console.log('AssetLoader function has been called')
  // console.log(useLoader(GLTFLoader, './assets/assets_3d/room.gltf'));
  // console.log(nodes);
  return (null)
}

function Loading() {
  return (null);
}

export default function App() {
  return (
    ReactDOM.render(
       <Canvas>
         <Suspense fallback = {<Loading />}>
            <AssetLoader></AssetLoader>
         </Suspense>
         
         <ambientLight />
         <pointLight position={[10, 10, 10]} />
         <BoxDemo position={[1.2, 0, 0]} />
       </Canvas>,
      document.getElementById('root')
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
