import React from 'react';
import {View, Alert } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import ClientGroup from '../components/ClientGroup';
import ClientModel from '../models/ClientModel';
import { ScrollView } from 'react-native-gesture-handler';
import realm from '../databases/Schema';
import {allClientGroup} from '../databases/Schema';

export default class HomeScreen extends React.Component
{    
    constructor(props){
        super(props);

        this.state = {
            clients: [],
            isLoading: false,
        }

        realm.addListener('change', () => {
            this.loadClient();
        })
    }

    loadClient = () => {
        allClientGroup().then((models) => {
            console.log(models);
            this.setState({
                clients: models,
            });
        }).catch((error) => {

            this.setState({
                clients: []
            });

            Alert.alert(
                "Lỗi",
                error,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        })
    }

    componentDidMount(){
        this.loadClient();
    }

    render(){
        return (
            <View>
                <HeaderCustom title="NHÓM BẢNG TÍNH" isBack={false} isAdd={true} navigation={this.props.navigation} moveScreen='AddClientGroupScreen'/>
                <ScrollView style={{marginBottom: 60}}>
                    {
                        this.state.clients.map((items, i) => {
                            return (
                                <ClientGroup key={i} navigation={this.props.navigation} client={items}/>
                            )
                        })

                    }
                </ScrollView>
            </View>
        )
    }
}

// export default function HomeScreen({navigation}){
//     return (
//         <View>
//             <HeaderCustom title="NHÓM BẢNG TÍNH" isBack={false} isAdd={true} navigation={navigation} moveScreen='AddClientGroupScreen'/>
//             <ClientGroup navigation={navigation}/>
//             <ClientGroup navigation={navigation}/>
//         </View>
//     )
// }