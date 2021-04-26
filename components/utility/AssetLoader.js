import React, { useRef, useState, Suspense, ErrorBoundary } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { parseGltfObject } from './ParseGltfObject'

import { GltfObject } from '../objects/GltfObject'

/*
	ASSETLOADER: renders all objects from a specified gltf file
*/

function AssetLoader(props) {

	/* vars */
	var sceneObjects = [];
	var sceneLights = [];

	const gltf = useLoader(GLTFLoader, props.path);
	const gltfObjects = gltf.scene.children;
	
	/* navigable list of all objects in gltf file */
	console.log(gltfObjects);

	/* scenegraph in console */
	console.log(dumpObject(gltf.scene).join('\n'));

	/* determine what each object is */
	gltfObjects.map(object => { 
		sceneObjects.push(parseGltfObject(object, props.inputHandler, props.open)); 
	});

	return (sceneObjects);
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
	const localPrefix = isLast ? '└─' : '├─';
	lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
	const newPrefix = prefix + (isLast ? '  ' : '│ ');
	const lastNdx = obj.children.length - 1;
	obj.children.forEach((child, ndx) => {
	  const isLast = ndx === lastNdx;
	  dumpObject(child, lines, isLast, newPrefix);
	});
	return lines;
  }

export { AssetLoader };