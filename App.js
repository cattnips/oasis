import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect, Suspense, ErrorBoundary, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useRender, useFrame, render, useThree, extend, bufferGeometry } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BoxDemo from './components/BoxDemo'
import { Camera, Light, Mesh, PointLight, Scene, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
extend({ EffectComposer, RenderPass, GlitchPass })
// import AssetLoader from './components/AssetLoader'
extend({ OrbitControls })


export default class App extends React.Component {
	render() {
		return (
			<Canvas>
				<Suspense fallback={<Loading />}>
					<AssetLoader path={require('./assets_3d/oasis_test1.gltf')}></AssetLoader>
				</Suspense>
				<OrbitControl />
				<ambientLight intensity={.2} />
				<BoxDemo position={[1.2, 0, 0]} />
			</Canvas>
		);
	}
}



/* COMPONENTS */

const OrbitControl = () => {
	
	const ref = useRef();
	const { camera, gl, invalidate } = useThree();

	camera.position.set(2, 2, 0);
	useFrame(() => ref.current.update())
	useEffect(() => void ref.current.addEventListener('change', invalidate), [])
	
	return(

		/*
			In three-fiber constructor arguments are always passed as an array via args. 
			If args change later on, the object must naturally get re-constructed from scratch!
			https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#constructor-arguments


			OrbitControls properties documentation: https://threejs.org/docs/#examples/en/controls/OrbitControls 
		*/

		<orbitControls 
			ref={ref} 
			enableZoom={true} 
			autoRotate={true} 
			enableDamping={true}
			dampingFactor={.05} 
			panSpeed={.5}
			rotateSpeed={.25}
			maxDistance={10.0}
			minDistance={2}
			args={[	camera	,	gl.domElement	]}
			
		/>
	);
}

class GltfObject extends React.Component {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)

		// bind event handler methods (what events will this component react to?)
	}

	render(){
		return(
			/*
				changing from null to primitive, to catch everything that isn't a mesh and not defined
			*/
			null
		);
	}
		
	
}

class GltfMesh extends GltfObject {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)

		// bind event handler methods (what events will this component react to?)
	}

	componentDidMount() {
		console.log('mesh found')
	}

	render() {
		return(
			// <primitive object={this.props.object}/>
			<mesh
				position={this.props.position}
				rotation={this.props.rotation}
				scale={this.props.scale}

				args={[
					this.props.geometry,
					this.props.material
				]
			}>
				<meshPhongMaterial /*color="hotpink"*//>
			</mesh>
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

class GltfLight extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('light found')
	}

	render() {
		return(
			// null
			<pointLight
				position={this.props.position}
				intensity={this.props.intensity}
			/>
		);
	}
}



/* FUNCTIONS */

function AssetLoader(props) {
	// return an array of primitives

	const gltf = useLoader(GLTFLoader, props.path);
	const gltfObjects = gltf.scene.children;
	var sceneObjects = [];
	var sceneLights = [];

	console.log(gltfObjects);

	gltfObjects.map(object => { 
		sceneObjects.push(parseGltfObject(object)); 
	});

	return (sceneObjects);
}

function parseGltfObject(object) {

	/*
	  parseGltfObject(object)
		> assigns events(?) to the separate types of objects in GLTF file
	 
	  TODO: handle ALL types of objects that will be included in final gltf file (think animation, special materials, etc)
	 
	*/

	switch (object.type.toString()) {

		case 'Object3D':
			if (object.children.length > 0) {
				let lightTypes = ["DirectionalLight", "PointLight"]
				let lightSource = object.children[0]

				
				// return(<primitive object={object} key={object.uuid}/>)
				// return(null)
				if (lightSource.type.toString() == 'PointLight') {
					console.log('creating pointLight');

					return (
						<GltfLight
							position={object.position}
							intensity={lightSource.intensity/10}
							key={object.uuid}
						/>
					)
				}

				// lightTypes.map(lightTypeString => {
				// 	if (lightSource.type.toString() == lightTypeString) {
				// 		console.log('GltfLight created: ')
				// 		console.log(lightSource)
						

				// 		return(
				// 			lightSource
				// 		)
				// 	}
				// })
			}
			break;

		case 'Mesh':
			// console.log(object)

			if(object.children.length != 0) {
				parseGltfObjectChildren(object.children)
			} else {
				return (
					<GltfMesh
						object={object} 
						key={object.uuid}
						geometry={object.geometry}
						material={object.material}
						position={object.position}
						rotation={object.rotation}
						scale={object.scale}
						// PUT MESH PROPERTIES HERE https://threejs.org/docs/index.html#api/en/objects/Mesh
					/>
				)
			}
			

			
			break;

		case 'Camera':
			// record camera pos/rot and pass to camera handler(?) < don't wanna do EXACTLY that but you know what this means
			break;


		default:
			// console.log('type' + object.children[0] + 'not found')
			break;
	}

	// return (<primitive object={object} key={object.uuid}></primitive>)
}

function parseGltfObjectChildren(array) {
	if (Array.isArray(array)) {

		array.map(child => {
			// console.log('parseGltfObjectChildren func called for: ' + child.name)
			parseGltfObject(child)

			if (child.children.length != 0) {
				let nestedChildren = child.children;

				// console.log (child.name + ' has children:')
				// console.log(child.children);
				
				nestedChildren.map(nestedChild => {
					// parseGltfObject(child)

					if (nestedChild.children.length != 0) {
						console.log (child.name + ' has a nested child that has children!: ')
						// console.log(nestedChild.children);
						console.log('^	TODO: something about this	^')
					}
				})
			}


		})

	} else {
		throw "Object passed to parseGltfObjectChildren() not an array.";
	}

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