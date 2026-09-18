import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../context/NavigationContext';

export default function TelaInicialScreen() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEBEF" />

      {/* Seção Superior com Logo */}
      <View style={styles.secaoSuperior}>
        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/socialy-logo-transparent.png')}
            style={styles.imagemLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Mensagem de Boas-vindas */}
      <View style={styles.containerMensagem}>
        <Text style={styles.textoFraseEfeito}>
          Conecte-se com as pessoas e{'\n'}compartilhe momentos.
        </Text>
      </View>

      {/* Seção de Ações: Entrar ou Criar Conta */}
      <View style={styles.secaoBotoes}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoPrimario]}
          onPress={() => navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.textoBotaoPrimario}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoSecundario]}
          onPress={() => navigate('CriarConta')}
          activeOpacity={0.85}
        >
          <Text style={styles.textoBotaoSecundario}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEF',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
  },
  secaoSuperior: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    height: 200,
  },
  imagemLogo: {
    width: '100%',
    height: '100%',
  },
  containerMensagem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  textoFraseEfeito: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  secaoBotoes: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  botao: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  botaoPrimario: {
    backgroundColor: '#DC586D',
  },
  textoBotaoPrimario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  botaoSecundario: {
    backgroundColor: '#FFFFFF',
  },
  textoBotaoSecundario: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
