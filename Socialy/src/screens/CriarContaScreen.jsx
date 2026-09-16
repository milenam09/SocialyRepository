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
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';

export default function CriarContaScreen() {
  const { navigate, setUserProfile } = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (name.trim()) {
      setUserProfile((prev) => ({
        ...prev,
        name: name.trim(),
      }));
    }
    // Sucesso e redirecionamento para o feed
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
          {/* Card Criar Conta */}
          <View style={styles.card}>
            {/* Logo */}
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Título */}
            <Text style={styles.titulo}>Criar Conta</Text>

            {/* Formulário */}
            <View style={styles.formulario}>
              {/* Nome Completo */}
              <View style={styles.campo}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* E-mail */}
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

              {/* Senha */}
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
            </View>
          </View>

          {/* Botão Entrar (Cadastrar) */}
          <TouchableOpacity
            style={styles.botao}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>

          {/* Rodapé: Já tem uma conta? Entrar */}
          <View style={styles.loginContainer}>
            <Text style={styles.textoLogin}>Já tem uma conta?</Text>
            <TouchableOpacity
              onPress={() => navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.linkLogin}>Entrar</Text>
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
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    width: '94%',
    maxWidth: 380,
    backgroundColor: '#FFF7F7',
    borderWidth: 1.2,
    borderColor: '#DC5A70',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 26,
  },
  formulario: {
    width: '100%',
    gap: 24,
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
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#111111',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botao: {
    width: '58%',
    maxWidth: 240,
    height: 48,
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF5268',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  textoLogin: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  linkLogin: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#DF5268',
  },
});
