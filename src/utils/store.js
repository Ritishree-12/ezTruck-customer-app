import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Using AsyncStorage for React Native, can be different for web or other platforms
  whitelist: ['login'], // Specify the reducers you want to persist
  // Optionally, you can configure blacklist for reducers you don't want to persist
  // blacklist: ['someReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default { store, persistor };
