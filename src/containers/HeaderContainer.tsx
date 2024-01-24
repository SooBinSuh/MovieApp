import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorConstants, FontConstants, SizeConstants} from '../constants/Constants';

interface HeaderContainerProps {
  title: string | undefined;
  children: React.ReactNode;
}

const HeaderContainer = (props: HeaderContainerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.childrens}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor:'gray',
    borderBottomWidth:0.2,
    marginHorizontal:SizeConstants.paddingLarge,
  },
  title: {
    flex: 1,
    fontWeight:FontConstants.weightBold,
    fontSize:FontConstants.sizeTitle,
    color:ColorConstants.black700,
  },
  childrens: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default HeaderContainer;
