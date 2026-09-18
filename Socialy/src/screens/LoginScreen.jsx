import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { api } from '../services/api';
import { colors } from '../theme/colors';
import styles from '../styles/LoginScreenStyle';

export default function LoginScreen() {
  const { navigate, setCurrentUser } = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const realizarLogin = async () => {
    const emailFormatado = email.trim();
    if (!emailFormatado || !senha) {
      Alert.alert('Campos Obrigatórios', 'Por favor, digite seu e-mail e sua senha.');
      return;
    }

    try {
      setCarregando(true);
      const usuario = await api.loginUser(emailFormatado, senha);
      setCurrentUser(usuario);
      navigate('Feed');
    } catch (erro) {
      Alert.alert('Falha no Login', erro.message || 'Não foi possível autenticar.');
    } finally {
      setCarregando(false);
    }
  };

  const recuperarSenha = () => {
    Alert.alert('Recuperar Senha', 'Um link de recuperação foi enviado para seu e-mail.');
  };

  const loginComGoogle = () => {
    navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cartao}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>Entrar</Text>

            <View style={styles.formulario}>
              <View style={styles.campo}>
                <Text style={styles.rotulo}>E-mail</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Ex:Email@email.com"
                  placeholderTextColor={colors.placeholderGray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.campo}>
                <Text style={styles.rotulo}>Senha</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Digite sua senha"
                  placeholderTextColor={colors.placeholderGray}
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              <TouchableOpacity
                onPress={recuperarSenha}
                activeOpacity={0.7}
                style={styles.botaoEsqueceuSenha}
              >
                <Text style={styles.textoEsqueceuSenha}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.botaoEntrar, carregando && { opacity: 0.7 }]}
              onPress={realizarLogin}
              activeOpacity={0.85}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.divisorContainer}>
            <View style={styles.linhaDivisor} />
            <Text style={styles.textoDivisor}>Ou</Text>
            <View style={styles.linhaDivisor} />
          </View>

          <TouchableOpacity
            style={styles.botaoGoogle}
            onPress={loginComGoogle}
            activeOpacity={0.85}
          >
            <View style={styles.iconeGoogleContainer}>
              <Ionicons name="logo-google" size={18} color={colors.googleRed} />
            </View>
            <Text style={styles.textoBotaoGoogle}>Entrar com Google</Text>
          </TouchableOpacity>

          <View style={styles.rodapeContainer}>
            <Text style={styles.textoRodape}>Não tem uma conta?</Text>
            <TouchableOpacity
              onPress={() => navigate('CriarConta')}
              activeOpacity={0.7}
            >
              <Text style={styles.linkRodape}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
