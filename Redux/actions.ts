import { IDriver } from "../models/IDriver";

export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "REACEIVE_API_DATA";

export const requestApiData = (page: number) => ({
    type: REQUEST_API_DATA, 
    payload: page
})
export const receiveApiData = (data: IDriver[]) => ({type: RECEIVE_API_DATA, data})