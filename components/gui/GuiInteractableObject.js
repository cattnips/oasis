import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Effects } from "../utility/Effects";
import { OrbitControl } from "../utility/OrbitControl";


function GuiInteractableObject(props) {
	const scene = useRef();
	const { camera } = useThree();

	useFrame(({ gl }) => void (
		(gl.autoClear = true),
		// gl.setClearColor('red'),
		gl.clearDepth(),
		gl.render(scene.current, camera)
		// gl.setSize(300, 300)
	), 10);


	return (
		<scene ref={scene}>
			<OrbitControl enableZoom={false} autoRotate={true} />


			<mesh args={[props.object.props.geometry, props.object.props.material]} />
			<Effects />
			<pointLight position={[0, 5, 0]} />
			<ambientLight intensity={.2} />
		</scene>
	);
}

export { GuiInteractableObject }