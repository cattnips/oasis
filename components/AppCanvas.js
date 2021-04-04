import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { AssetLoader } from "./AssetLoader.js";
import { BoxDemo } from "./BoxDemo.js";
import { Loading } from './Loading';
import { Camera } from "./Camera";
import { Effects } from "./Effects";
import { GltfCamera } from "./GltfCamera";
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
					<AssetLoader
						path={require('../assets_3d/02_05_export.gltf')}
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


