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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '../context/NavigationContext';
import { api } from '../services/api';
import { colors } from '../theme/colors';

export default function CriarContaScreen() {
  const { navigate, setCurrentUser } = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função para validar campos e registrar novo usuário
  const realizarCadastro = async () => {
    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim();

    if (!nomeFormatado || !emailFormatado || !senha) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha nome, e-mail e senha.');
      return;
    }

    if (!emailFormatado.includes('@') || !emailFormatado.includes('.')) {
      Alert.alert('E-mail Inválido', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (senha.length < 3) {
      Alert.alert('Senha Curta', 'A senha deve conter no mínimo 3 caracteres.');
      return;
    }

    try {
      setCarregando(true);
      const novoUsuario = await api.registerUser({
        name: nomeFormatado,
        email: emailFormatado,
        password: senha,
      });

      setCurrentUser(novoUsuario);
      Alert.alert('Sucesso!', `Bem-vindo(a) ao Socialy, ${novoUsuario.name}!`, [
        {
          text: 'Começar',
          onPress: () => navigate('Feed'),
        },
      ]);
    } catch (erro) {
      Alert.alert('Não foi possível cadastrar', erro.message || 'Verifique sua conexão com a API.');
    } finally {
      setCarregando(false);
    }
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
          {/* Cartão de Cadastro */}
          <View style={styles.cartao}>
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
              {/* Campo Nome */}
              <View style={styles.campo}>
                <Text style={styles.rotulo}>Nome Completo</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#999"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

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
            </View>
          </View>

          {/* Botão Criar Conta */}
          <TouchableOpacity
            style={[styles.botaoCadastrar, carregando && { opacity: 0.7 }]}
            onPress={realizarCadastro}
            activeOpacity={0.85}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.textoBotaoCadastrar}>Criar Conta</Text>
            )}
          </TouchableOpacity>

          {/* Rodapé: Link para tela de Login */}
          <View style={styles.rodapeLoginContainer}>
            <Text style={styles.textoJaTemConta}>Já tem uma conta?</Text>
            <TouchableOpacity
              onPress={() => navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.linkEntrar}>Entrar</Text>
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
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  cartao: {
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
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#111111',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoCadastrar: {
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
  textoBotaoCadastrar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rodapeLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  textoJaTemConta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  linkEntrar: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#DF5268',
  },
});
