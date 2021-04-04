import React from 'react';
import { Canvas } from 'react-three-fiber';
import { GuiPanelPreview } from "./GuiPanelPreview";


export class GuiPanelLeft extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.visible ? <div style={{
					// THIS IS WHAT'S CHANGED WHEN THINGS ARE CLICKED
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					position: 'absolute',
					zIndex: 100,
					minWidth: '375px',
					width: '33%',
					bottom: '0px',
					top: '0px',
					backgroundColor: 'rgba(0, 0, 0, .85)',
					margin: '0px',
					paddingLeft: '20px',
					paddingRight: '20px',
					color: 'white',
				}}>






					<div style={{
						opacity: '100%',
						margin: '0px 20px',
						fontSize: '64px',
						textAlign: 'right',
						width: '100%'
					}}>

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
							<img src={require('../assets/icon_close.png')} style={{ height: '30px' }} />
						</button>

						<h1 style={{
							fontFamily: 'RobotoBold',
							fontSize: '1em',
							paddingTop: '20px',
							marginBlock: '0px',
							overflow: 'hidden',
							width: '100%'
						}}>
							{this.props.selectedObject?.props.name}
						</h1>


						<h2 style={{
							margin: '0px',
							paddingTop: '10px',
							paddingBottom: '10px',
							fontFamily: 'RobotoItalic',
							fontSize: '.5em',
							color: 'DimGray',
							marginBlock: '0px',
						}}>visual description</h2>


						<p style={{
							fontFamily: 'RobotoRegular',
							fontSize: '.3em',
							margin: '0px',
						}}
						>the place where (most of) the magic happens. built in 2015 with the graduation money I recieved from family, it's been through quite a few upgrades (in fact, the only original parts not replaced - not including the case - have been the hard drives and the mouse/keyboard(!) in it's lifetime.</p>


						<Canvas style={{ height: '300px', width: '100%', margin: '0px', padding: '0px' }}>
							<GuiPanelPreview object={this.props.selectedObject} />
						</Canvas>

					</div>

				</div> : null}
			</div>

		);
	}
}
