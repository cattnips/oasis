import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

/*

	FUNCTIONS

*/

export function Effects() {
	const { gl, scene, camera, size, backgroundColor, THREE } = useThree();
	const composer = useRef();
	// scene.backgroundColor = new THREE.Color( 0xff0000 );
	useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
	useFrame(() => composer.current.render(), 1);

	return (
		<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray="passes" args={[scene, camera]} />
			<glitchPass attachArray="passes" renderToScreen />
		</effectComposer>
	);
}
