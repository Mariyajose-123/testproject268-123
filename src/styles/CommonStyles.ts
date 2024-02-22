import { StyleSheet } from "react-native";
import CustomColors from "../asset/colors";

const styles = StyleSheet.create({
  fullFlex:{
    flex: 1
  },
rowContainerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowCenterContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullFlexCenter:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  fullPaddingContainer:{
    paddingHorizontal: 20, 
    paddingVertical: 20
  },
  whiteColor:{
    color: CustomColors.Secondary
  },
  redColor:{
    color: CustomColors.red
  },
  rowDireaction:{
    flexDirection: 'row'
  },
  W80:{
    width: '80%'
  },
  W90:{
    width:'90%'
  },
  PV10:{
    paddingVertical: 10
  },
  greyColor:{
    color:CustomColors.grey
  },
  blueColor:{
    color:CustomColors.PrimaryColor
  },
  lemonyellowBackgroundColor:{
    backgroundColor: CustomColors.lemonyellowBackgroundColor
  },
  sideBarIcon:{
    width: 20,
    height: 20
  }
});

export default styles;