import { applyMiddleware,combineReducers,compose,createStore } from "redux";
import { persistReducer,persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import AsyncStorage from "@react-native-async-storage/async-storage";



