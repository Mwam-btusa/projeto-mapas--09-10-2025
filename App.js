import { StyleSheet, View, Dimensions, Text, SafeAreaView } from 'react-native'; 
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Obter a largura da tela uma vez
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
      // O loadingContainer usa flex: 1 e preenche o espaço
      <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  } else if (location) {
    // Se a localização for obtida, renderiza o mapa DENTRO do container delimitador
    content = (
      // NOVO CONTAINER: Define a altura e as margens do mapa na tela
      <View style={styles.mapArea}> 
        <MapView
          style={styles.map} // MapView preenche 100% da área definida por mapArea
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
      </View>
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
    // SafeAreaView: Garante que o conteúdo respeite as áreas seguras do SO
    <SafeAreaView style={styles.container}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container principal (SafeAreaView): Ocupa 100% da área segura
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo para preencher o espaço ao redor do mapa
    alignItems: 'center', // Centraliza o mapArea horizontalmente
    justifyContent: 'center', // Centraliza o mapArea verticalmente se ele não usar flex: 1
  },
  
  // 🗺️ NOVO ESTILO: Container que DELIMITA a área do mapa
  mapArea: {
    // --- DIMENSÕES DO MAPA ---
    height: 400, // <--- ALTURA FIXA: Ajuste este valor para controlar o tamanho vertical
    width: '90%', // Ocupa 90% da largura da tela
    
    // --- ESPAÇAMENTO E ESTILO ---
    marginTop: 20,    // Espaço extra no topo, se necessário
    marginBottom: 20, // Espaço extra na base, se necessário
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'blue', 
    overflow: 'hidden', 
  },
  
  // MapView: Agora preenche 100% do seu container pai (mapArea)
  map: {
    flex: 1, 
    width: '100%', 
  },

  // Contêiner para centralizar mensagens de carregamento/erro
  // Não usa o mapArea para que a mensagem ocupe o espaço total, se necessário
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