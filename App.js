import ReactDOM from 'react-dom'
import { StatusBar } from 'expo-status-bar';
import React, { useState, ErrorBoundary, Component } from 'react';
import { Text, View } from 'react-native';
import { useLoader, useRender, render, extend, bufferGeometry, useResource } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { Camera, Light, Mesh, PointLight, Scene, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'

import { Box, Effects as DreiEffects, Text as ReactText } from '@react-three/drei'

import { MeshBasicMaterial } from 'three';
import { AppWrapper } from './components/utility/AppWrapper';
import { FontLoader } from './components/utility/FontLoader';

extend({ EffectComposer, RenderPass, GlitchPass })
extend({ OrbitControls })

export default class App extends React.Component {
	render() {
		return (
			<div style={{height:'100%'}}>
				<FontLoader/>
				<AppWrapper/>
			</div>
			
		);
	}
}

