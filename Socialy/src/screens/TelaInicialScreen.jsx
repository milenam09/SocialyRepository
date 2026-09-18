import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';
import styles from '../styles/TelaInicialStyle';

export default function TelaInicialScreen() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />

      <View style={styles.secaoSuperior}>
        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/socialy-logo-transparent.png')}
            style={styles.imagemLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.containerMensagem}>
        <Text style={styles.textoFraseEfeito}>
          Conecte-se com as pessoas e{'\n'}compartilhe momentos.
        </Text>
      </View>

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
