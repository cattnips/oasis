import React from 'react';
import { GltfObject } from './GltfObject';


export class GltfMesh extends GltfObject {
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
				// event propagation docs: https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#event-propagation-bubbling
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

				position={this.props.position}
				rotation={this.props.rotation}
				scale={this.props.scale}
				material={this.props.material ? this.props.material : <MeshBasicMaterial/>}
				args={[
					this.props.geometry,
					this.props.material
				]}>
				<meshStandardMaterial color={this.state.hovered ? 'orange' : 'white'} />
			</mesh>
		);
	}
}
