import {View} from 'react-native';
import {colors} from "../constants/colors";

export const Separator = () => (<View style={{
    borderColor: colors.separator,
    borderBottomWidth: 1,
    marginVertical: 10,
}}/>);