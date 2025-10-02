import React from 'react';
import './global.css';
import Home from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
};

export default App;
