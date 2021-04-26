import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { AssetLoader } from "./AssetLoader.js";
import { BoxDemo } from "./BoxDemo.js";
import { Loading } from './Loading';
import { Camera } from "../objects/Camera";
import { Effects } from "./Effects";
import { GltfCamera } from "../objects/GltfCamera";
import { OrbitControl } from "./OrbitControl";


export class AppCanvas extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Canvas
				onCreated={state => state.gl.setClearColor("black")}>
				<Camera />
				<Suspense fallback={<Loading />}>
					{/* <AssetLoader
						path={require('../gltf_exports/walls.gltf')} //../assets_3d/02_05_export.gltf
						inputHandler={this.props.inputHandler}
						open={this.props.open}
					></AssetLoader> */}
					<AssetLoader
						path={require('../../assets_3d/gltf/oasis008.gltf')} 
						inputHandler={this.props.inputHandler}
						open={this.props.open}
					></AssetLoader>
				</Suspense>
				<OrbitControl enableZoom={true} />

				<ambientLight intensity={1} />
				<BoxDemo position={[1.2, 0, 0]} />
				<GltfCamera></GltfCamera>
				<Effects />
			</Canvas>
		);
	}
}


