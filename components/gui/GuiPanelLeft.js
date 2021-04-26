import React from 'react';
import { Canvas } from 'react-three-fiber';
import { GuiInteractableObject } from "./GuiInteractableObject";
import { panelStyle, infoStyle } from "./guiPanelStyle";


export class GuiPanelLeft extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.visible ? <div id={'panel wrapper'} style={panelStyle}>
					<div id={'info'} style={infoStyle}>

						<h1 id={'object name'} style={{
							fontFamily: 'RobotoBold',
							fontSize: '1em',
							paddingTop: '20px',
							marginBlock: '0px',
							overflow: 'hidden',
							width: '100%'
						}}>
							{this.props.selectedObject?.props.name}
						</h1>

						<Canvas style={{ height: '300px', width: '100%', margin: '0px', padding: '0px' }}>
							<GuiInteractableObject object={this.props.selectedObject} />
						</Canvas>

						<button
							onClick={this.props.close}
							type={'button'}
							style={{
								position: 'absolute',
								top: '20px',
								left: '20px',
								backgroundColor: 'transparent',
								border: 'none',
								padding: '0px'
							}}>
							<img src={require('../../assets/icon_close.png')} style={{ height: '30px' }} />
						</button>

						


						{/* <h2 style={{
							margin: '0px',
							paddingTop: '10px',
							paddingBottom: '10px',
							fontFamily: 'RobotoItalic',
							fontSize: '.5em',
							color: 'DimGray',
							marginBlock: '0px',
						}}>visual description</h2> */}


						<p id={'object desc'} style={{
							fontFamily: 'RobotoRegular',
							fontSize: '.3em',
							margin: '0px',
						}}
						>the place where (most of) the magic happens. built in 2015 with the graduation money I recieved from family, it's been through quite a few upgrades (in fact, the only original parts not replaced - not including the case - have been the hard drives and the mouse/keyboard(!) in it's lifetime.</p>


						

					</div>

				</div> : null}
			</div>

		);
	}
}
