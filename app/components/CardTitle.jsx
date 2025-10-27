import {Text} from 'react-native';
import {colors} from "../constants/colors";

export const CardTitle = ({text}) =>
    (<Text style={{
        fontSize: 24,
        fontWeight: '600',
        color: colors.label.primary
    }}>
        {text}
    </Text>)