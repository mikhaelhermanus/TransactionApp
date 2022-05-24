import React from 'react';


import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './src/screen/IndexScreen';
import TransactionDetail from './src/screen/TransactionDetail';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="IndexScreen" component={IndexScreen} />
          <Stack.Screen name='TransactionDetail' component={TransactionDetail}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )

};

export default App;