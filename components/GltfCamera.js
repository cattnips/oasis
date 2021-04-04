import React from 'react';


export class GltfCamera extends React.Component {
	constructor(props) {
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
		return null;
	}
}
