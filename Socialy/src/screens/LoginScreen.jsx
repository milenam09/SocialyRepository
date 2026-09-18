import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView,Platform, Alert, ActivityIndicator,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { api } from '../services/api';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const { navigate, setCurrentUser } = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função para autenticar o usuário
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

  // Função para recuperação de senha
  const recuperarSenha = () => {
    Alert.alert('Recuperar Senha', 'Um link de recuperação foi enviado para seu e-mail.');
  };

  // Função para login com Google
  const loginComGoogle = () => {
    navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" />
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cartão Principal de Login */}
          <View style={styles.cartao}>
            {/* Logo */}
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Título */}
            <Text style={styles.titulo}>Login</Text>

            {/* Formulário de Autenticação */}
            <View style={styles.formulario}>
              {/* Campo E-mail */}
              <View style={styles.campo}>
                <Text style={styles.rotulo}>E-mail</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Ex:Email@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Campo Senha */}
              <View style={styles.campo}>
                <Text style={styles.rotulo}>Senha</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              {/* Botão Esqueceu a senha */}
              <TouchableOpacity
                onPress={recuperarSenha}
                activeOpacity={0.7}
                style={styles.botaoEsqueceuSenha}
              >
                <Text style={styles.textoEsqueceuSenha}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={[styles.botaoEntrar, carregando && { opacity: 0.7 }]}
              onPress={realizarLogin}
              activeOpacity={0.85}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divisor "Ou" */}
          <View style={styles.divisorContainer}>
            <View style={styles.linhaDivisor} />
            <Text style={styles.textoDivisor}>Ou</Text>
            <View style={styles.linhaDivisor} />
          </View>

          {/* Botão Entrar com Google */}
          <TouchableOpacity
            style={styles.botaoGoogle}
            onPress={loginComGoogle}
            activeOpacity={0.85}
          >
            <View style={styles.iconeGoogleContainer}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
            </View>
            <Text style={styles.textoBotaoGoogle}>Entrar com Google</Text>
          </TouchableOpacity>

          {/* Rodapé: Link para Criar Conta */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE9E8',
  },
  tecladoContainer: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  cartao: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFF7F7',
    borderWidth: 1.2,
    borderColor: '#DC5A70',
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 38,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 20,
  },
  formulario: {
    width: '100%',
    gap: 16,
  },
  campo: {
    width: '100%',
  },
  rotulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 6,
  },
  campoTexto: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: '#DF7182',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#111111',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoEsqueceuSenha: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  textoEsqueceuSenha: {
    fontSize: 11,
    color: '#DF5268',
    fontWeight: '500',
  },
  botaoEntrar: {
    width: '60%',
    height: 46,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF5268',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  textoBotaoEntrar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divisorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 28,
    marginBottom: 16,
  },
  linhaDivisor: {
    flex: 1,
    height: 1,
    backgroundColor: '#A33757',
    opacity: 0.5,
  },
  textoDivisor: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  botaoGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '75%',
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  iconeGoogleContainer: {
    marginRight: 10,
  },
  textoBotaoGoogle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  rodapeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoRodape: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  linkRodape: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#DF5268',
  },
});
