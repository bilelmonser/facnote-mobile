/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { logout } from '../redux';
import { View, Platform, AppState } from 'react-native';
import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ChooseInvoice from '../screens/Invoice/ChooseInvoice';
import IndemnitiesScreen from '../screens/Indemnities/IndemnitiesScreen';
import HistoryScreen from '../screens/HistoryOfPayementReceipts/HistoryScreen';
import BankStatementScreen from '../screens/BankStatement/BankStatementScreen';
import MyPurchasesSreen from '../screens/MyPurchases/MyPurchasesSreen';
import SalesScreen from '../screens/SalesScreen/SalesScreen';

import MoreScreen from '../screens/More/MoreScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import MenuImage from '../components/MenuImage/MenuImage';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';

import BackButton from '../components/BackButton/BackButton';

import TabBarItem from '../components/TabBarItem/TabBarItem';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import homeActive from '../../assets/icons/galery/homeActive.png';

import cameraActive from '../../assets/icons/galery/cameraActive.png';

import banqueActive from '../../assets/icons/galery/banqueActive.png';

import moreActive from '../../assets/icons/galery/moreActive.png';
import ScaleHelpers from '../Theme/scaleHelpers';
import { text, routes, permissions } from '../constants';
import jwtDecode from 'jwt-decode';

const Stack = createStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const LandingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          title: '',
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

//ios
const TabNavigator = () => {
  const canShowBank = useSelector((state) => state.auth.canShowBank);

  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        labelStyle: {
          textTransform: 'none',
          fontSize: ScaleHelpers.CalcWidth(15),
        },
        style: {
          height: ScaleHelpers.CalcHeight(12),
        },
        showLabel: false,
      }}
      initialRouteName={canShowBank ? routes.BankStatement : routes.Invoices}>
      <BottomTabNavigator.Screen
        name={routes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarItem
              focused={focused}
              label={text.Accueil}
              src={focused ? homeActive : homeActive}
            />
          ),
        }}
      />
      {/*<BottomTabNavigator.Screen
        name="Indicateur"
        component={HomeScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Indicateur'}
              src={focused ? IndicateurImgActive : IndicateurImg}
            />
          ),
        }}
      />*/}
      {canShowBank && (
        <BottomTabNavigator.Screen
          name={routes.BankStatement}
          component={BankStatementScreen}
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <TabBarItem
                focused={focused}
                label={text.RelevesBancaires}
                src={focused ? banqueActive : banqueActive}
              />
            ),
          }}
        />
      )}
      <BottomTabNavigator.Screen
        name={routes.Invoices}
        component={ChooseInvoice}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarItem
              focused={focused}
              label={text.DeposerFacture}
              src={focused ? cameraActive : cameraActive}
            />
          ),
        }}
      />

      <BottomTabNavigator.Screen
        name={routes.More}
        component={MoreScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarItem
              focused={focused}
              label={text.Plus}
              src={focused ? moreActive : moreActive}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

//android
const mainScreensNavigator = () => {
  //const state = useNavigationState(state => state);
  return (
    <Stack.Navigator
      initialRouteName={routes.Home}
      screenOptions={({ navigation }) => {
        /*var {routeName} = navigation.state.routes[navigation.state.index];
        if (routeName == 'BankAccounts') {
          routeName = 'Bank Accounts';
        }*/
        return {
          //headerTitle: routeName,

          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white',
            flex: 1,
          },
          headerStyle: {
            backgroundColor: '#4a7bd0',
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => <View />,
        };
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expenses" component={ChooseInvoice} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor:
              'linear-gradient(0.25turn,rgb(78,199,245), rgb(92,117,254))',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'SegoeUI',
          },
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        };
      }}>
      <Stack.Screen
        name="Nav"
        options={{
          headerShown: false,
        }}
        component={TabNavigator}
      //component={Platform.OS === 'ios' ? TabNavigator : mainScreensNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.Indemnities}
        component={IndemnitiesScreen}
      />
      <Stack.Screen
        options={({ navigation }) => {
          return {
            header: () => (
              <NavigationHeader
                onPress={() => {
                  navigation.goBack();
                }}
                title={text.HistoriqueJustificatifs}
              />
            ),
          };
        }}
        name={routes.HistoryOfPayementReceipts}
        component={HistoryScreen}
      />
      <Stack.Screen
        options={({ navigation }) => {
          return {
            header: () => (
              <NavigationHeader
                onPress={() => {
                  navigation.goBack();
                }}
                title={text.Cabinet}
              />
            ),
          };
        }}
        name={routes.Cabinet}
        component={ProfileScreen}
      />
      <Stack.Screen
        options={({ navigation }) => {
          return {
            header: () => <></>,
          };
        }}
        name={routes.MyPurchases}
        component={MyPurchasesSreen}
      />
      <Stack.Screen
        options={({ navigation }) => {
          return {
            header: () => <></>,
          };
        }}
        name={routes.Sales}
        component={SalesScreen}
      />
    </Stack.Navigator>
  );
};

//ios
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Landing" component={LandingNavigator} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainNavigator}
      />
    </Stack.Navigator>
  );
};

//android
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={({ navigation, state }) => {
        return <DrawerContainer navigation={navigation} />;
      }}
      drawerStyle={{ width: 250 }}
      initialRouteName="Main">
      <Drawer.Screen name="Landing" component={LandingNavigator} />
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

// Manifest of possible screens
const Root = createStackNavigator();
const RootNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'black',
      }}
      initialRouteName="DrawerStack">
      {isLoggedIn ? (
        <Root.Screen
          name="DrawerStack"
          component={Platform.OS === 'ios' ? Navigator : Navigator}
        />
      ) : (
        <Root.Screen name="LoginStack" component={LandingNavigator} />
      )}
    </Root.Navigator>
  );
};

class AppContainer extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    var dayInMilliseconds = 1000;
    var intervalId = setInterval(async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken == null) return;

      const decodeToken = jwtDecode(accessToken);
      if (decodeToken.exp < moment().unix()) {
        console.log('expire token and logout');
        this.props.logout();
      }
      return;
    }, dayInMilliseconds);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);

    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }
  _handleAppStateChange = async (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      console.log('App is going background');
      await AsyncStorage.setItem(
        'goingBackgroundTime',
        moment().unix().toString(),
      );
    } else if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');

      let goingBackgroundTime = await AsyncStorage.getItem(
        'goingBackgroundTime',
      );
      console.log(moment().unix() - goingBackgroundTime);
      // if more that  15 minute
      if (moment().unix() - goingBackgroundTime > 900) this.props.logout();
    }
    this.setState({ appState: nextAppState });
  };
  render() {
    return <NavigationContainer>{<RootNavigator />}</NavigationContainer>;
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { logout })(AppContainer);
