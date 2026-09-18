import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationProvider, useNavigation } from './src/context/NavigationContext';

import TelaInicialScreen from './src/screens/TelaInicialScreen';
import LoginScreen from './src/screens/LoginScreen';
import CriarContaScreen from './src/screens/CriarContaScreen';
import FeedScreen from './src/screens/FeedScreen';
import PublicacaoScreen from './src/screens/PublicacaoScreen';
import NovaPublicacaoScreen from './src/screens/NovaPublicacaoScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import EditarPerfilScreen from './src/screens/EditarPerfilScreen';
import NavegacaoScreen from './src/screens/NavegacaoScreen';
import NotificacoesScreen from './src/screens/NotificacoesScreen';

function MainApp() {
  const { currentScreen } = useNavigation();

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'TelaInicial':
        return <TelaInicialScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'CriarConta':
        return <CriarContaScreen />;
      case 'Feed':
        return <FeedScreen />;
      case 'Publicacao':
        return <PublicacaoScreen />;
      case 'NovaPublicacao':
        return <NovaPublicacaoScreen />;
      case 'Perfil':
        return <PerfilScreen />;
      case 'EditarPerfil':
        return <EditarPerfilScreen />;
      case 'Navegacao':
        return <NavegacaoScreen />;
      case 'Notificacoes':
        return <NotificacoesScreen />;
      default:
        return <TelaInicialScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <MainApp />
      </NavigationProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEF',
  },
});
