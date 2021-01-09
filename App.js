import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, Suspense, ErrorBoundary, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useRender, useFrame, render, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BoxDemo from './components/BoxDemo'
import { Camera, Mesh, PointLight, Scene } from 'three';
// import AssetLoader from './components/AssetLoader'
extend({ OrbitControls })

const OrbitControl = () => {
	const ref = useRef()
	const { camera } = useThree()
	useFrame(() => ref.current.update())
	return <orbitControls ref={ref}/>
}


export default class App extends React.Component {
	render() {
		return (
			<Canvas /* camera={{ position: [0, 0, 300] }}*/>
				<Suspense fallback={<Loading />}>
					<AssetLoader path={require('./assets_3d/room.gltf')}></AssetLoader>
				</Suspense>
				{/* <OrbitControl /> */}
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{/* <BoxDemo position={[1.2, 0, 0]} /> */}
			</Canvas>
		);
	}
}



/* COMPONENTS */

class GltfObject extends React.Component {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)

		// bind event handler methods (what events will this component react to?)
	}

	render(){
		return(null);
	}
		
	
}

class GltfMesh extends GltfObject {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)

		// bind event handler methods (what events will this component react to?)
	}

	render() {
		return(
			<primitive object={this.props.object}></primitive>
		);
	}
}

class GltfCamera extends React.Component {
	// constructor (props) {
	// 	super(props);
	// 	this.camera;
	// 	this.orbitControl = this.orbitControl.bind(this);
	// }

	// orbitControl() {
	// 	// const ref = useRef()
	// 	// const { camera } = useThree()
	// 	// useRender(() => ref.current.obj.update())
	// 	// return <orbitControls ref={ref} args={[camera]} {...props} />
	//   }
	
	
	render() {
		return null
	}
}



/* FUNCTIONS */

function parseGltfObject(object) {

	/*
	  parseGltfObject(object)
		> assigns events(?) to the separate types of objects in GLTF file
	 
	  TODO: handle ALL types of objects that will be included in final gltf file (think animation, special materials, etc)
	 
	*/

	switch (object.type.toString()) {

		case 'Object3D':
			if (!object.children.length > 0 && object.name.substring(0, 5) == 'Empty')  // if Object has children and Object name starts with 'Empty' (case-sensitive)
				console.log('found empty');
			else if (object.name.substring(0, 5) == 'Point')   // if Object name starts with 'Point'
				//
				console.log('found point light');
			else
				parseObjectChildren(object.children);
			break;


		case 'Mesh':
			console.log('SceneMesh created')
			return (<GltfMesh object={object} key={object.uuid}></GltfMesh>)
			break;

		case 'Camera':
			// record camera pos/rot and pass to camera handler(?) < don't wanna do EXACTLY that but you know what this means
			break;


		default:
			// console.log('type' + object.children[0] + 'not found')
			break;
	}

	return (<primitive object={object} key={object.uuid}></primitive>)
}

function parseObjectChildren(children) {
	if (Array.isArray(children)) {

		children.map(child => {
			console.log('parseObjectChildren func called for: ' + child.name)
		})

	} else {
		throw "Object passed to parseObjectChildren() not an array.";
	}

}

function AssetLoader(props) {
	// return an array of primitives

	const gltf = useLoader(GLTFLoader, props.path);
	const gltfObjects = gltf.scene.children;
	var sceneObjects = [];

	console.log(gltfObjects);

	gltfObjects.map(object => { 
		sceneObjects.push(parseGltfObject(object)); }
	);

	return (sceneObjects);
}




/* UTILITY FUNCTIONS */

function Loading() {
	// console.log('fallback called');
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