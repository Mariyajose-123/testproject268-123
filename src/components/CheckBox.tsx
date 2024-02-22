import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {Images} from '../asset/images';
import CustomColors from '../asset/colors';

interface CheckBoxProps {
  text?: string;
  onPressCheckBox?: () => void;
  value?: any;
  containerStyle?: any;
  textStyle?: any;
  onPressText?: () => void;
  item?: any;
}

const CheckBox = (props: CheckBoxProps) => {
  const {
    text,
    onPressCheckBox,
    value,
    containerStyle,
    textStyle,
    onPressText,
    item,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkBoxContainer, containerStyle]}
        onPress={onPressCheckBox}>
        {value ? (
          <Image
            source={Images.approvalsSel}
            tintColor={CustomColors.PrimaryBlue}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={Images.checkBoxIcon}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressText} style={styles.container}>
        <Text style={[styles.checkBoxText, textStyle]}>{text} - {item}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingTop: 15,
    alignItems: 'center',
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxText: {
    fontSize: 14,
    color: CustomColors.black,
    lineHeight: 19,
    paddingHorizontal: 7,
  },
  image: {
    width: 18,
    height: 20,
  },
});
