import React, { useState, useEffect, Children } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity   } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {IDriver} from './models/IDriver'
import { requestApiData } from './Redux/actions';
import { useDispatch, useSelector } from 'react-redux';




function HomeScreen(): JSX.Element {

    

  const dispatch = useDispatch();


  const [page,setPage] = useState(0)

  
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(requestApiData(page))
  }, [page]);



  const drivers: IDriver[] = useSelector((state: any) => state.data)

  


  return (
    <View style={{backgroundColor: 'white'}}>
    
    <View style={styles.header}>
      <Text style={styles.header2Text}>Гонщики: </Text>
      
      <View style={{ flexDirection: 'row' }}>

        {page > 0 && <TouchableOpacity style={styles.button} onPress={()=> setPage(page-1)}>
          <Text style={styles.buttonText}> 
            {`<`} 
          </Text>
        </TouchableOpacity>}
        <View style={{flexDirection:'row',alignItems: 'center', justifyContent: 'center', marginHorizontal: 5}}>
          <Text style={{...styles.header2Text, marginRight: 7,marginLeft:3, fontSize: 25, color: 'blue'}}>
            {page+1} 
          </Text>

          <Text style={styles.header2Text}>
             / 86
          </Text>
        </View>
        
        {page < 85 && <TouchableOpacity style={styles.button} onPress={()=> setPage(page+1)}>
          <Text style={styles.buttonText}> 
            {`>`} 
          </Text>
        </TouchableOpacity>}
      </View>
    </View>
 
    <FlatList
    data={drivers}
    keyExtractor={(driver) => driver.DriverId}
    renderItem={({ item: driver , index}) => (
      <TouchableOpacity style={{...styles.driverContainer, marginBottom: index === drivers.length-1 ? 120 : 0}} onPress={() => {navigation.navigate('ProfileScreen' as never, driver as never)}}>
        
            <Text style={{...styles.driverId, marginBottom: 3}}>
                {driver.children.length === 4 ? 
                    driver.children[0].value + ' ' + driver.children[1].value
                : 
                    driver.children[1].value + ' ' + driver.children[2].value
                }
            </Text>
            
            <Text style={{...styles.driverId, fontSize: 14, fontWeight: '500'}}>
                {' id: ' + `'${driver.DriverId}'`}
            </Text> 
      

        {driver.children.map((child, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text style={styles.attributeName}>{child.name}:</Text>
            <Text>{child.value}</Text>
          </View>
        ))}
      </TouchableOpacity>
    )}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  driverContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FEF3F4',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    position: 'relative',
  },
  driverId: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  attributeName: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gill Sans'
  },
  header: {
    height: 120,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10
    },
    header2Text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    width: 30,
    height: 30, alignItems: 'center',
    justifyContent: 'center'
    },
    buttonText: {
    fontWeight: 'bold',
    fontSize: 17
    },
});

export default HomeScreen;

