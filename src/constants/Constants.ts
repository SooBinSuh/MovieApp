import {Appearance, TextStyle} from 'react-native';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';


const isDarkMode = Appearance.getColorScheme() === 'dark';
const FontConstants = {
  familyRegular: 'sans-serif',
  sizeTitle: 18,
  sizeRegular: 14,
  weightBold: "bold" as FontWeight,
};
const ColorConstants = {
  background: isDarkMode ? '#333333' : '#efefef',
  backgroundMedium: isDarkMode ? '#666666' : '#dddddd',
  backgroundLight: isDarkMode ? 'gray': 'gray',
  font: isDarkMode ? '#eeeeee' : '#222222',
};
const SizeConstants = {
  paddingSmall: 2,
  paddingRegular: 8,
  paddingLarge: 16,
  borderRadius: 8,
};
export {FontConstants, ColorConstants, SizeConstants};
