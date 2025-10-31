// Importe SafeAreaView junto com os outros componentes do react-native
import { StyleSheet, View, Dimensions, Text, SafeAreaView } from 'react-native'; 
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('A permissão para acessar a localização foi negada.');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };
  
  useEffect(() => {
    fetchLocation();
  }, []);

  let content = <Text>Obtendo sua localização...</Text>;

  if (errorMsg) {
    content = <Text>{errorMsg}</Text>;
  }
  
  // O mapa só será renderizado quando 'location' for válido
  if (location) {
    content = (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04, 
        }}
      >
        <Marker 
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={"Minha Posição Atual"}
          description={"Aqui estou eu!"}
          pinColor="red" 
        />
      </MapView>
    );
  }

  return (
    // Use SafeAreaView como o container principal
    // O estilo {flex: 1} garante que ele ocupe toda a tela disponível
    <SafeAreaView style={styles.container}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Este estilo agora se aplica ao SafeAreaView
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});