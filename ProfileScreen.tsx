import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IRace } from './models/IRace';
import { IChild } from './models/IChild';
import axios from 'axios';



const ProfileScreen = (id: any) => {

    const driverParamsInfo = id.route.params
    const navigation = useNavigation()

    console.log(driverParamsInfo.DriverId)
    const [fetchedRaces, setFetchedRaces] = useState<IRace[]>([])



    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('helloi')
            const response = await axios.get(`https://ergast.com/api/f1/2008/drivers/${driverParamsInfo.DriverId}/results`);
            const xmlData = response.data;
            console.log('Parsing XML data...');
            
            const XMLParser = require('react-xml-parser')
            const ParsedXmlData = new XMLParser().parseFromString(xmlData);
            const races = ParsedXmlData.getElementsByTagName('Race')
            const pageRaces = [...races]

            const fetchedDrivers = pageRaces.map((race) => {
              return {
                RaceSeason: race.attributes.season,
                URL: race.attributes.round,
                RaceName: race.children[0].value,
                Date: race.children[2].value,
                Position: race.children[4].children[0].attributes.position,
                Points: race.children[4].children[0].attributes.points,
                Laps: race.children[4].children[0].children[3].value,
                Time: race.children[4].children[0].children[5]?.value
              };
            });
    
            setFetchedRaces(fetchedDrivers as never)
          } catch (err) {
            console.error(err);
          }
        };
        fetchData()
      }, []);
    
   

return(
    <View style={styles.container}>

    <View style={styles.header}>
      <Text style={styles.headerText}> Профиль гонщика</Text>
      
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home' as never)}
      >
        <Text style={styles.homeButtonText}>Назад</Text>
      </TouchableOpacity>
    </View>

    <ScrollView>
    
        <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Гонщик:</Text>
        <Text style={styles.infoText}>Driver ID: {driverParamsInfo.DriverId}</Text>
        {driverParamsInfo.children.map((child: IChild, index: any) => (
            <View key={index} style={{flexDirection:'row'}} >
                <Text style={styles.infoText}>
                    {child.name}: 
                </Text>
                <Text style={{...styles.infoText, color: 'blue', marginLeft: 10}}>
                    {child.value}
                </Text>
            </View>
            
        ))}

            <Text style={styles.infoHeader}>Заезды:</Text>

        {fetchedRaces.length > 0 ? 
            fetchedRaces.map((race, index) => (
            <View key={index} style={styles.raceContainer}>
                <Text style={{fontSize: 16, alignSelf: 'center',marginVertical: 5}}>
                    Race: {race.RaceName}
                </Text>

                <View style={{flexDirection: 'row', width:'100%', justifyContent: 'space-around'}}>
                    <View style={styles.propsContainer}>
                        <Text>
                            Year:
                        </Text>

                        <Text>
                            {race.RaceSeason}
                        </Text>
                    </View>
                    <View style={styles.propsContainer}>
                        <Text>
                            Laps:
                        </Text>

                        <Text>
                            {race.Laps}
                        </Text>
                    </View>
                    <View style={styles.propsContainer}>
                        <Text>
                            Position:
                        </Text>

                        <Text>
                            {race.Position}
                        </Text>
                    </View>
                    <View style={styles.propsContainer}>
                        <Text>
                            Points:
                        </Text>

                        <Text>
                            {race.Points}
                        </Text>
                    </View>
                    <View style={{...styles.propsContainer, borderRightWidth: 0}}>
                        <Text>
                            Time:
                        </Text>

                        <Text>
                            {race.Time}
                        </Text>
                    </View>
                </View>
                
            </View>
        
        ))
        :
                <Text style={{alignSelf: 'center'}}>
                    Не учавствовал в заездах.
                </Text>
        }


        
        </View>
    </ScrollView>
  </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
        hadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        marginVertical: 20,
        marginHorizontal: 10
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    header: {
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 5
      },
      homeButton: {
        padding: 7,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
      },
      homeButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      container2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      },
      raceContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        borderWidth: 1,
      },
      propsContainer:{
        borderTopWidth:1,
        borderRightWidth: 1, 
        alignItems:'center',
        justifyContent: 'center',
        width: '20%'
      },
    });
    
    

export default ProfileScreen;