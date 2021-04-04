import { useFonts } from 'expo-font';

/*

	CONSTANTS

*/

export function FontLoader() {
	const [loaded] = useFonts({
		Dogica: require('../assets/fonts/OTF/Dogica.otf'),
		Dogica_Pixel: require('../assets/fonts/OTF/Dogica_Pixel.otf'),
		Dogica_Bold: require('../assets/fonts/OTF/Dogica_bold.otf'),
		PixelArial11: require('../assets/fonts/PixelArial11.ttf'),
		RobotoBold: require('../assets/fonts/roboto/Roboto-Bold.ttf'),
		RobotoRegular: require('../assets/fonts/roboto/Roboto-Regular.ttf'),
		RobotoItalic: require('../assets/fonts/roboto/Roboto-Italic.ttf'),
	});

	return (null);
	// return (
	// 	<View style={{fon}}
	// )
}
