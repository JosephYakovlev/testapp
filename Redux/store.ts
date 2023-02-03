import { RECEIVE_API_DATA } from "./actions";
import { IDriver } from "../models/IDriver";

interface IAction {
  type: string;
  data: any;
}

interface IState {
  data: any;
}

const initialState: IState = {
  data: [],
};



export default (state=initialState, action: IAction) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return action.data
    default:
      return state
  }
}