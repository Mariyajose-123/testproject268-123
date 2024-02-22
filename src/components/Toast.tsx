import React ,{useState,useRef,useEffect}from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import Toast from 'react-native-easy-toast';

import { Images } from '../asset/images';
import CustomColors from '../asset/colors';


const ToastMessage = (props: any) => {
    const toastRef = useRef<any>(null);
    const { message, type, show, position } = props;
    let messageWithIcon: JSX.Element;
    const [positionToast, setPosition] = useState();
  
    useEffect(() => {
      switch (type) {
        case "danger":
          messageWithIcon = (
            <View
              style={[styles.Toast_inside_view, styles.toastDanger_new_Style]}
            >
              <Image
                resizeMode="contain"
                source={Images.checkBoxIcon}
                style={styles.toastLogo}
              />
  
              <View style={styles.mediumMarginHorizontal}>
                <Text style={styles.Toast_inside_Header}>
                 "Error"
                </Text>
                <Text style={styles.Toast_inside_text}>{message}</Text>
              </View>
            </View>
          );
          break;
        case "success":
          messageWithIcon = (
            <View
              style={[styles.Toast_inside_view, styles.toastSuccess_new_Style]}
            >
              <Image
                resizeMode="contain"
                source={Images.approvalsSel}
                style={styles.toastLogo}
              />
  
              <View style={styles.mediumMarginHorizontal}>
                <Text style={styles.Toast_inside_Header}>
                "successful"
                </Text>
                <Text style={styles.Toast_inside_text}>{message}</Text>
              </View>
            </View>
          );
          break;
        case "warning":
          messageWithIcon = (
            <View
              style={[styles.Toast_inside_view, styles.toastWarning_new_Style]}
            >
              <Image
                resizeMode="contain"
                source={Images.arrowIcon}
                style={styles.toastLogo}
              />
  
              <View style={styles.mediumMarginHorizontal}>
                <Text style={styles.Toast_inside_Header}>
                 "warning"
                </Text>
                <Text style={styles.Toast_inside_text}>{message}</Text>
              </View>
            </View>
          );
          break;
        default:
          break;
      }
  
      if (show) {
        setPosition(position);
        toastRef?.current?.show(messageWithIcon);
      }
    }, [props]);

    return(
        <Toast
        ref={toastRef}
        fadeInDuration={2500}
        position={"bottom"}
        textStyle={CustomColors.Secondary}
        style={styles.toastStyle}
        />
    );
};

export default ToastMessage;

export const styles = StyleSheet.create({
    Toast_inside_view: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 22,
        borderRadius: 3,
        height: 67,
      },
      toastDanger_new_Style: {
        backgroundColor: "red",
      },
      Toast_inside_text: {
        fontSize:12,
        lineHeight: 15,
        color:CustomColors.black,
      },
      Toast_inside_Header: {
        fontSize:16,
        lineHeight: 19,
        color: CustomColors.black,
      },
      toastSuccess_new_Style: {
        backgroundColor:"green",
      },
      toastWarning_new_Style: {
        backgroundColor: "pink",
      },
      toastLogo: {
        width: 21,
        height: 21,
      },
      logoContainer: {
        width: 21,
        height: 21,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10.5,
        marginRight: 15,
      },
      warningText: {
        color: CustomColors.Secondary,
        fontSize:14,
        lineHeight: 21,
        textAlign: "center",
      },
      toastStyle: {
        // bottom: 20,
        // backgroundColor: "transpreant",
      },
      mediumMarginHorizontal: {
        marginHorizontal: 15,
      }
})