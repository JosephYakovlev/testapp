import { applyMiddleware } from "redux";
import { configureStore  } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "./root-reducer";

import rootSaga from "./driverSaga"

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run


export const store = configureStore({
    reducer, 
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
