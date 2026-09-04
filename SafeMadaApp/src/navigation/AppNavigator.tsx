import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SOSScreen from '../screens/sos/SOSScreen';
import ReportScreen from '../screens/signalement/ReportScreen';
import MapScreen from '../screens/home/MapScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Dashboard') iconName = 'stats-chart';
          else if (route.name === 'Map') iconName = 'map';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Stats' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Carte' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: COLORS.white }, headerTintColor: COLORS.dark }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="SOS" component={SOSScreen} options={{ title: 'Alerte SOS', headerStyle: { backgroundColor: COLORS.danger }, headerTintColor: COLORS.white }} />
            <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Nouveau signalement' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
