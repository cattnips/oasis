import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';


export const OrbitControl = (props) => {
	/*
		TO-DO

		add controls to cycle through camera positions, through gesture and/or regions of selection

	*/

	const ref = useRef();
	const { camera, gl, invalidate } = useThree();

	// CAMERA POSITION IS SET HERE
	camera.position.set(2, 2, 0);
	useFrame(() => ref.current.update(), 1);
	useEffect(() => void ref.current.addEventListener('change', invalidate), []);

	return (

		/*
			In three-fiber constructor arguments are always passed as an array via args.
			If args change later on, the object must naturally get re-constructed from scratch!
			https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#constructor-arguments


			OrbitControls properties documentation: https://threejs.org/docs/#examples/en/controls/OrbitControls
		*/
		<orbitControls
			ref={ref}
			enableZoom={props.enableZoom}
			autoRotate={props.autoRotate ? props.autoRotate : false}
			enableDamping={true}
			dampingFactor={.05}
			panSpeed={.5}
			rotateSpeed={.25}
			maxDistance={10.0}
			minDistance={2}
			args={[camera, gl.domElement]} />
	);
};
