import { StyleSheet } from 'react-native';

const panelStyle = {

	// flex
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',

	// position
	position: 'absolute',
	zIndex: 100,
	bottom: '0px',
	top: '0px',

	// visual
	backgroundColor: 'rgba(0, 0, 0, .8)',
	color: 'white',

	// size
	minWidth: '375px',
	width: '100%',
	margin: '0px',
};

const infoStyle = {
	// color: 'black',
	// position: "absolute",

	// top: '10px',
	// width: '100%',
	// zIndex: 100,
	// display: 'block',
	fontSize: '64px',
	textAlign: 'left',
	maxWidth: '400px'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	info: {
		// color: 'black',
		// position: "absolute",
		// top: '10px',
		// width: '100%',
		// zIndex: 100,
		// display: 'block'
		// text-align: 'center',
		// z-index: '100',
		// display: 'block',
	},
});


export {panelStyle, infoStyle}