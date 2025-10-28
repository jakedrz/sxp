import {Text} from 'react-native';
import {colors} from "../constants/colors";

export const CardTitle = ({text, fontSize=24}) =>
    (<Text style={{
        fontSize: fontSize,
        fontWeight: '600',
        color: colors.label.primary
    }}>
        {text}
    </Text>)