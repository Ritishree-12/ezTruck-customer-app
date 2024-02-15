import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/utils/store';
import App from './App';

const AppWrapper = () => {
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App></App>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
