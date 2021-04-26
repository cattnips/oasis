import React from 'react';
import { GuiPanelRight } from "./GuiPanelRight";
import { GuiPanelLeft } from "./GuiPanelLeft";


export class GuiPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.selectedObject ?
					<GuiPanelLeft
						close={this.props.close}
						visible={this.props.visible}
						selectedObject={this.props.selectedObject} />
					: null}

				<GuiPanelRight />
			</div>

		);
	}
}
