import React from 'react';
import { ColorConstants, FontConstants, SizeConstants } from '../constants/Constants';
import { StyleSheet, Text } from 'react-native';


interface HeaderProps {
  text: string;
}

const Header = (props: HeaderProps) => {
  return <Text style={styles.header}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: FontConstants.sizeTitle,
        fontWeight : FontConstants.weightBold as any,
        marginBottom : SizeConstants.paddingLarge,
        color : ColorConstants.font,
    },
  });

export default Header;
