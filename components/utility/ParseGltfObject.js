import React, { useRef, useState, Suspense, ErrorBoundary } from 'react';
import { Canvas, useLoader, useFrame, applyProps } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { GltfMesh, GltfObject } from '../objects/GltfObject'

import { lorem } from './lorem'

export function parseGltfObject(object, meshHandler, guiLeftPanelOpen) {
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
		/> 

		// <primitive object={object}></primitive>
	);
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