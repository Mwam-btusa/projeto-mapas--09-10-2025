// app.config.js

// 1. Importa a configuracao de variaveis de ambiente (.env)
import 'dotenv/config'; 

// 2. Define a chave de API (puxando do .env)
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export default ({ config }) => {
  return {
    ...config,
    // Configurações do Expo
    name: "GoogleMapsExpo",
    slug: "GoogleMapsExpo",
    version: "1.0.0",
    // ... (Mantenha outras configurações gerais)

    // 3. Injeta a chave na configuracao iOS
    ios: {
      ...config.ios,
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY, // AQUI está a variável
      }
    },

    // 4. Injeta a chave na configuracao Android
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apikey: GOOGLE_MAPS_API_KEY, // AQUI está a variável
        }
      }
    }
  };
};