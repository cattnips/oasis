import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect, Suspense, ErrorBoundary, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useLoader, useRender, useFrame, render, useThree, extend, bufferGeometry, useResource } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BoxDemo from './components/BoxDemo'
// import { Camera, Light, Mesh, PointLight, Scene, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'

import { Effects as DreiEffects, Text as ReactText } from '@react-three/drei'

import { LoremIpsum } from "lorem-ipsum"
extend({ EffectComposer, RenderPass, GlitchPass })
// import AssetLoader from './components/AssetLoader'
extend({ OrbitControls })



export default class App extends React.Component {
	render() {
		return (
			<AppWrapper/>
		);
	}
}

/* 

	COMPONENTS

*/

class AppCanvas extends React.PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<Canvas>
				<Camera/>
				<Suspense fallback={<Loading />}>
					<AssetLoader 
						path={require('./assets_3d/oasis_test1.gltf')}
						inputHandler = {this.props.inputHandler}
						open={this.props.open}
					></AssetLoader>
				</Suspense>
				<OrbitControl />
				<ambientLight intensity={.2} />
				<BoxDemo position={[1.2, 0, 0]} />
				<GltfCamera></GltfCamera>
				<Effects/>
			</Canvas> 
		)
	}
}

class AppWrapper extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeObject: null,
			visible: true
		}

		this.close = this.close.bind(this)
		this.open = this.open.bind(this)

		this.handler = this.handler.bind(this)		
	}

	close() {
		this.setState({
			visible: false
		})
	}

	open() {
		this.setState({
			visible: true
		})
	}

	handler(mesh) {
		// console.log('handler() called for object ' + mesh.props.name)
		// console.log(mesh);
		this.setState({
			activeObject: mesh
		})
	}

	render() {
		return (
			<div style={{height: "100%"}}>
				<GuiPanel
					selectedObject={this.state.activeObject}
					visible={this.state.visible}
					close={this.close}
				/>

				<AppCanvas 
					inputHandler = {this.handler}
					open = {this.open}
				/>
			</div>
		)
	}
}

class GuiPanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div>
				{this.props.selectedObject ?  <GuiPanelLeft close={this.props.close} visible={this.props.visible} selectedObject={this.props.selectedObject}/> : null }
				
				<GuiPanelRight/>
			</div>
			
		)
	}
}

class GuiPanelLeft extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	visible: true
		// }

		// this.close = this.close.bind(this)
		// this.open = this.open.bind(this)
	}

	// close() {
	// 	this.setState({
	// 		visible: false
	// 	})
	// }

	// open() {
	// 	this.setState({
	// 		visible: true
	// 	})
	// }

	render() {
		return(
			<div>
			{this.props.visible ? <div style={{
				// THIS IS WHAT'S CHANGED WHEN THINGS ARE CLICKED
			   display: 'flex',
			   flexDirection: 'column',
			   position: 'absolute',
			   zIndex: 100,
			   minWidth: '375px',	// NEEDS TO BE CHANGED FOR MOBILE, a slightly different system needs to be used for gui
			   width: '33%',
			   bottom: '0px',
			   top: '0px',
			   backgroundColor: 'rgba(128, 128, 128, .3)',
			   margin: '20px'
		   }}>


			   



			   <div style={{
				   opacity: '100%', 
				   margin: '0px 20px'
			   }}>
				   
				   {/* marginBlock: what is setting is the default to a non-zero value?? where do I go to change that at the root level?? */}

				   <h1 style={{
					   fontSize: '48px',
					   padding: '20px 0px',
					   marginBlock: '0px',
					   overflow: 'hidden'
				   }}>
					   {this.props.selectedObject?.props.name}
				   </h1>


				   <h2 style={{
					   color: 'dark grey', 
					   marginBlock: '0px'
				   }}>visual description</h2>


				   <p>{lorem.generateSentences(3)}</p>
				   


				   <button 
				   type={'button'} 
				   style={{
					   position: 'absolute',
					   top: '5px',
					   right: '5px',
					   backgroundColor: 'transparent',
					   border: 'none',
					   padding: '0px'
					   
				   }}
				   onClick={this.props.close}>

				   

				   <img src={require('./assets/icon_close.png')} style={{
					   height: '30px'
				   }}/>
			   </button>
			   </div>
			   
			   








		   </div> : null}
		   </div>
			
		)
	}
}

class GuiPanelRight extends React.PureComponent {
	render() {
		return(
			null
		)
	}
}

const guiPanelStyle = {

}

const infoStyle = {
	color: 'black',
	position: "absolute",
	
	top: '10px',
	width: '100%',
	zIndex: 100,
	display: 'block'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	info: {
		// color: 'black',
		// position: "absolute",
		
		// top: '10px',
		// width: '100%',
		// zIndex: 100,
		// display: 'block'
		// text-align: 'center',
		// z-index: '100',
		// display: 'block',
	},
});

// const guiInfoStyle = {
// 	position: absolute
// }

// const info = (
// 	<div className={"info"} style={styles.info}>
// 		<h2>{this.props.name}</h2>
// 		<p>{this.props.description}</p>
// 		<p>{this.props.notes}</p>
// 	</div>
// )

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
	  max: 8,
	  min: 4
	},
	wordsPerSentence: {
	  max: 16,
	  min: 4
	}
});

const OrbitControl = () => {
	
	/*
		TO-DO

		add controls to cycle through camera positions, through gesture and/or regions of selection

	*/


	const ref = useRef();
	const { camera, gl, invalidate } = useThree();

	// CAMERA POSITION IS SET HERE
	camera.position.set(2, 2, 0);
	useFrame(() => ref.current.update(), 2)
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
		this.state = {hovered: false}
		this.state = {active: false}
		// bind event handler methods (what events will this component react to?)
		// this.props
	}

	componentDidMount() {
		console.log('mesh found')
	}

	render() {
		return(
			<mesh
				// event propagation docs: https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#event-propagation-bubbling

				onPointerOver={(e) => {
					e.stopPropagation()
					this.setState({hovered: true})
				}}
				onPointerOut={(e) =>  {
					e.stopPropagation()
					this.setState({hovered: false})
				}}
				onClick={(e) => {
					// showInfo(name, description, notes)
					console.log(this.props.name + " says: I\'ve been clicked!")
					this.props.inputHandler(this)
					// should be changing visible state of GuiPanelLeft to true
					this.props.open()
					e.stopPropagation()
					// this.showInfo(this.props.name, this.props.description, this.props.notes)
				}}
				position={this.props.position}
				rotation={this.props.rotation}
				scale={this.props.scale}

				args={[
					this.props.geometry,
					this.props.material
				]
			}>
				<meshStandardMaterial color={this.state.hovered ? 'orange' : 'white' }/>
			</mesh>
		);
	}
}

class GltfCamera extends React.Component {
	constructor (props) {
		super(props);
		this.orbitControl = this.orbitControl.bind(this);
	}

	componentDidMount() {
		// const ref = useRef()
		// const { setDefaultCamera } = useThree()

		// useEffect(() => void setDefaultCamera(ref.current), [])
		// useFrame(() => ref.current.updateMatrixWorld())
		console.log('GltfCamera mounted: ' + this.props.camera);
		
	}

	orbitControl() {
		// const ref = useRef()
		// const { camera } = useThree()
		// useRender(() => ref.current.obj.update())
		// return <orbitControls ref={ref} args={[camera]} {...props} />
	  }
	

	// camera.position.set(2, 2, 0);
	
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



/* 

	FUNCTIONS

*/

function Effects() {
	const { gl, scene, camera, size } = useThree()
	const composer = useRef()
	useEffect(() => void composer.current.setSize(size.width, size.height), [size])
	useFrame(() => composer.current.render(), 1)

	return (
		<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray="passes" args={[scene, camera]} />
      		<glitchPass attachArray="passes" renderToScreen />
		</effectComposer>
	)
}

function Camera(props) {
	const ref = useRef()
	const { setDefaultCamera } = useThree()
	// Make the camera known to the system
	useEffect(() => void setDefaultCamera(ref.current), [])
	// Update it every frame
	useFrame(() => ref.current.updateMatrixWorld())
	return <perspectiveCamera ref={ref} {...props} />
}

function Information (props) {
	useFrame(({ gl }) => void ((gl.autoClear = false), gl.render(this.information()), 5))

	return(
		<ReactText
			// style={styles.info}
			color={'red'}
			fontSize={1}>
			HELLO?!
		</ReactText>
	);
	
}


function AssetLoader(props) {
	// return an array of primitives

	const gltf = useLoader(GLTFLoader, props.path);
	const gltfObjects = gltf.scene.children;
	var sceneObjects = [];
	var sceneLights = [];

	console.log(gltfObjects);

	gltfObjects.map(object => { 
		sceneObjects.push(parseGltfObject(object, props.inputHandler, props.open)); 
	});

	return (sceneObjects);
}

function parseGltfObject(object, meshHandler, guiLeftPanelOpen) {

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
			}
			break;

		case 'Mesh':
			// console.log(object)

			if(object.children.length != 0) {
				parseGltfObjectChildren(object.children)
			} else {
				return (
					<GltfMesh
						name={object.name}
						description={lorem.generateSentences(1)}
						notes={lorem.generateParagraphs(1)}
						object={object} 
						key={object.uuid}
						geometry={object.geometry}
						material={object.material}
						position={object.position}
						rotation={object.rotation}
						scale={object.scale}
						inputHandler={meshHandler}
						open={guiLeftPanelOpen}
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
	//	V	V	REPLACE THIS CODE WITH GLTFOBJECT	V	V
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

