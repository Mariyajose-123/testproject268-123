import { StackScreenProps } from "@react-navigation/stack";


export type RootStackParamList = {
    Login:undefined;
    Settings:undefined;
};


export type loginProps = StackScreenProps<RootStackParamList,"Login">;
export type settingsProps = StackScreenProps<RootStackParamList,"Settings">;