import React, { useRef, useState, Suspense, ErrorBoundary } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { GltfObject } from './GltfObject'

// ./parseGltfObject.js imports
import { lorem } from "./lorem";
import { GltfLight } from "./GltfLight";
import { GltfMesh } from "./GltfMesh";

function parseGltfObject(object, meshHandler, guiLeftPanelOpen) {
	/*
	  parseGltfObject(object)
		> assigns events(?) to the separate types of objects in GLTF file
	 
	  TODO: handle ALL types of objects that will be included in final gltf file (think animation, special materials, etc)
	 
	*/

	// console.log(object)
	switch (object.type.toString()) {

		case 'Object3D':
			if (object.children.length > 0) {
				let lightTypes = ["DirectionalLight", "PointLight"];
				let lightSource = object.children[0];


				// return(<primitive object={object} key={object.uuid}/>)
				// return(null)
				if (lightSource.type.toString() == 'PointLight') {
					console.log('creating pointLight');
					console.log(lightSource);

					return (
						<GltfLight
							pos={object.position}
							strength={lightSource.intensity}
							key={lightSource.uuid} />
					);
				}
			}
			break;

		case 'Mesh':
			// console.log(object)
			if (object.children.length != 0) {
				parseGltfObjectChildren(object.children);
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
						open={guiLeftPanelOpen} />
				);
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
	return <GltfObject object={object}></GltfObject>
}

function parseGltfObjectChildren(array) {
	if (Array.isArray(array)) {

		array.map(child => {
			// console.log('parseGltfObjectChildren func called for: ' + child.name)
			parseGltfObject(child);

			if (child.children.length != 0) {
				let nestedChildren = child.children;

				// console.log (child.name + ' has children:')
				// console.log(child.children);
				nestedChildren.map(nestedChild => {
					// parseGltfObject(child)
					if (nestedChild.children.length != 0) {
						console.log(child.name + ' has a nested child that has children!: ');
						// console.log(nestedChild.children);
						console.log('^	TODO: something about this	^');
					}
				});
			}


		});

	} else {
		throw "Object passed to parseGltfObjectChildren() not an array.";
	}
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

export { AssetLoader };