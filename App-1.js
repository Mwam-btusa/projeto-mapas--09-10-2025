// Importe SafeAreaView junto com os outros componentes do react-native
import { StyleSheet, View, Dimensions, Text, SafeAreaView } from 'react-native'; 
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Obter a largura da tela uma vez fora do componente para otimização
const { width } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchLocation = async () => {
    // 1. Solicita permissão de localização
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      setErrorMsg('A permissão para acessar a localização foi negada.');
      return;
    }

    // 2. Obtém a posição atual
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };
  
  useEffect(() => {
    fetchLocation();
  }, []);

  let content;

  // Renderização condicional
  if (errorMsg) {
    // Se houver erro, exibe a mensagem centralizada
    content = (
      <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  } else if (location) {
    // Se a localização for obtida, renderiza o mapa
    content = (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04, // Nível de zoom em latitude
          longitudeDelta: 0.04, // Nível de zoom em longitude
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
  } else {
    // Estado inicial de carregamento
    content = (
      <View style={styles.loadingContainer}>
          <Text>Obtendo sua localização...</Text>
      </View>
    );
  }

  return (
    // SafeAreaView: Garante que o conteúdo não se sobreponha a elementos do SO (como barras de status)
    <SafeAreaView style={styles.container}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container principal (SafeAreaView) que ocupa 100% da área segura
  container: {
    flex: 1,
  },
  // MapView: Usa flex: 1 para preencher todo o container seguro
  map: {
    flex: 1, 
    width: width, // Garante que a largura seja a da tela
  },
  // Contêiner para centralizar mensagens de carregamento/erro
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  // Estilo específico para a mensagem de erro
  errorText: {
      color: 'red',
      textAlign: 'center',
      paddingHorizontal: 20,
  }
});