import {View} from 'react-native';
import {colors} from "../constants/colors";
import {StyleSheet} from "react-native";

export const Separator = () => (<View style={{
    borderColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
}}/>);