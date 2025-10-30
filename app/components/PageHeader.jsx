import {Text, View} from "react-native";
import {colors} from "@/app/constants/colors";


function Title({text}) { return (<Text style={{color: 'white', fontSize: 34, fontWeight: '700'}}>{text}</Text>)}
function Subtitle({text}) { return (<Text style={{color: colors.label.secondary, fontSize: 18}}>{text}</Text>)}
function GameInfoSubtext({text}) { return (<Text style={{color: colors.label.tertiary, fontSize: 16}}>{text}</Text>)}

function PageHeader({title='Home', subtitle, gameInfo}) {
    return (<View style={{paddingHorizontal: 20, width: '100%'}}>
        <Title text={title}/>
        <Subtitle text={subtitle}/>
        <GameInfoSubtext text={gameInfo}/>
        {/*<Text style={{color: colors.label.tertiary, fontSize: 16}}>Oct 6-27</Text>*/}
        {/*<Text style={{color: colors.label.tertiary, fontSize: 16}}>10k steps, 5 days/week</Text>*/}
    </View>);
}

export default PageHeader;