import React from 'react';

class GltfObject extends React.Component {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)
		// bind event handler methods (what events will this component react to?)
	}

	render() {
		return (
			/*
				changing from null to primitive, to catch everything that isn't a mesh and not defined
			*/
			// <primitive object={this.props.object}></primitive>
			null
		);
	}
}

class GltfMesh extends GltfObject {
	constructor(props) {
		super(props);
		// initialize local state here (what states should this component have??)
		this.state = { hovered: false };
		this.state = { active: false };
		// bind event handler methods (what events will this component react to?)
		// this.props
	}

	componentDidMount() {
		console.log('mesh found');
	}

	render() {
		return (
			<mesh
				/* 
					threeJS mesh class constructor 
				*/
				args={[
					this.props.geometry,
					this.props.material
				]}
				
				/* 
					react-three-fiber events 
					event propagation docs: https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#event-propagation-bubbling
				*/
				onPointerOver={(e) => {
					e.stopPropagation();
					this.setState({ hovered: true });
				}}
				onPointerOut={(e) => {
					e.stopPropagation();
					this.setState({ hovered: false });
				}}
				onClick={(e) => {
					// showInfo(name, description, notes)
					console.log(this.props.name + " says: I\'ve been clicked!");
					this.props.inputHandler(this);
					// should be changing visible state of GuiPanelLeft to true
					this.props.open();
					e.stopPropagation();
					// this.showInfo(this.props.name, this.props.description, this.props.notes)
				}}

				/* threeJS properties */
				position={this.props.position}
				rotation={this.props.rotation}
				scale={this.props.scale}
				material={this.props.material ? this.props.material : <meshBasicMaterial/>}
				>
				{/* <meshBasicMaterial 
					
					color={this.state.hovered ? 'orange' : 'white'} /> */}
			</mesh>
		);
	}
}

export { GltfMesh, GltfObject }