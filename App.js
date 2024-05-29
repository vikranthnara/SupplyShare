import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import SellItemScreen from "./screens/SellItemScreen";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();


export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [fullname, setFullname] = useState("");

  const handleSignIn = (username) => {
    setSignedIn(true);
    setFullname(username);
  };

  return signedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {() => <HomeScreen fullname={fullname} />}
        </Tab.Screen>
        <Tab.Screen name="SellItem" component={SellItemScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() => <HomeScreen fullname={fullname} />}
      </Tab.Screen>
      <Tab.Screen name="SellItem" component={SellItemScreen} />
      <Tab.Screen name="SignIn">
        {() => (
          <SignInScreen
            setSignedIn={setSignedIn} // Pass the setSignedIn prop
            handleSignIn={handleSignIn} // Pass the handleSignIn prop
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
  );
}

/* import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./screens/HomeScreen";
import SellItemScreen from "./screens/SellItemScreen";
import SignInScreen from "./screens/SignInScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [fullname, setFullName] = useState('');

  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home">
            {() => <HomeScreen signedIn={signedIn} fullname={fullname} />}
          </Tab.Screen>
          <Tab.Screen name="SellItem" component={SellItemScreen} />
        </Tab.Navigator>
      ) : (
        <SignInScreen setSignedIn={setSignedIn} setFullName={setFullName} />
      )}
    </NavigationContainer>
  );
} */
