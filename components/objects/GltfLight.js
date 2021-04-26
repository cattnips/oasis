import React from 'react';


export class GltfLight extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('light found');
	}

	render() {
		return (
			<pointLight
				position={props.pos}
				intensity={props.strength} />
		);
	}
}
