import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ToastAndroid, StyleSheet, NativeModules } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
 
const { IconChanger } = NativeModules;
 
const ICON_IMAGES = {
  MainActivityDefault: require('./assets/ic_launcher.png'),
  MainActivityPromo: require('./assets/ic_launcher_alt1.png'),
  MainActivityFestival: require('./assets/ic_launcher_alt2.png'),
};
 
export default function App() {
  const [iconName, setIconName] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchIconSetting() {
      try {
        await remoteConfig().setDefaults({
          app_icon: 'MainActivityDefault',
        });
 
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: 0,
        });
 
        const activated = await remoteConfig().fetchAndActivate();
        console.log('[Remote Config] Activated:', activated);
 
        const selectedIcon = remoteConfig().getValue('app_icon').asString();
        console.log('[Remote Config] icon fetched:', selectedIcon);
        ToastAndroid.show(`Changing to ${selectedIcon}`, ToastAndroid.SHORT);
 
        IconChanger.changeIcon(selectedIcon); // Native call
        setIconName(selectedIcon);
      } catch (err) {
        console.error('Error fetching remote config:', err);
        ToastAndroid.show('Error fetching config', ToastAndroid.LONG);
        setIconName('MainActivityDefault');
      } finally {
        setLoading(false);
      }
    }
 
    fetchIconSetting();
  }, []);
 
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Fetching icon configuration...</Text>
      </View>
    );
  }
 
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Current Icon: {iconName}</Text>
      <Image source={ICON_IMAGES[iconName]} style={styles.icon} resizeMode="contain" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
 
 