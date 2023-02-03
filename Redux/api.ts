import axios from "axios";
import { IDriver } from "../models/IDriver";
import { IChild } from "../models/IChild";

export const fetchData = async (page: number) => {
    try {
      console.log('helloi')
      const response = await axios.get(`https://ergast.com/api/f1/drivers?limit=10&offset=${page*10}`);
      const xmlData = response.data;
      console.log('Parsing XML data...');
      
      const XMLParser = require('react-xml-parser')
      const ParsedXmlData = new XMLParser().parseFromString(xmlData);
      const driver = ParsedXmlData.getElementsByTagName('Driver')
      const pageDrivers = [...driver]

      const fetchedDrivers: IDriver[] = pageDrivers.map((driver) => {
        return {
          DriverId: driver.attributes.driverId,
          URL: driver.attributes.driverId,
          children: driver.children.map((child: IChild) => ({name: child.name,value: child.value}))
        };
      });


      return fetchedDrivers
    
    } catch (err) {
      console.error(err);
    }
  };