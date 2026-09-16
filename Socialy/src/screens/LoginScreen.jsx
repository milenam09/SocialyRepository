import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validação simples e navegação para o feed
    navigate('Feed');
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Um link de recuperação foi enviado para seu e-mail.');
  };

  const handleGoogleLogin = () => {
    navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card Principal de Login */}
          <View style={styles.card}>
            {/* Logo do Card */}
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Título */}
            <Text style={styles.titulo}>Login</Text>

            {/* Formulário */}
            <View style={styles.formulario}>
              {/* Campo E-mail */}
              <View style={styles.campo}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
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
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Link Esqueceu a senha */}
              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoEntrar}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* Divisor "Ou" */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Botão Entrar com Google */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.85}
          >
            <View style={styles.googleIconContainer}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
            </View>
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </TouchableOpacity>

          {/* Link Não tem uma conta? Criar conta */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Não tem uma conta?</Text>
            <TouchableOpacity
              onPress={() => navigate('CriarConta')}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Criar conta</Text>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 6,
  },
  input: {
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
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  forgotPasswordText: {
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 28,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#A33757',
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  googleButton: {
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
  googleIconContainer: {
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  footerLink: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#DF5268',
  },
});
