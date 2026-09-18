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
import { useNavigation } from '../context/NavigationContext';
import { api } from '../services/api';
import { colors } from '../theme/colors';
import styles from '../styles/CriarContaScreenStyle';

export default function CriarContaScreen() {
  const { navigate, setCurrentUser } = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

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

            <Text style={styles.titulo}>Criar Conta</Text>

            <View style={styles.formulario}>
              <View style={styles.campo}>
                <Text style={styles.rotulo}>Nome Completo</Text>
                <TextInput
                  style={styles.campoTexto}
                  placeholder="Digite seu nome"
                  placeholderTextColor={colors.placeholderGray}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

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
            </View>
          </View>

          <TouchableOpacity
            style={[styles.botaoCadastrar, carregando && { opacity: 0.7 }]}
            onPress={realizarCadastro}
            activeOpacity={0.85}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.textoBotaoCadastrar}>Criar Conta</Text>
            )}
          </TouchableOpacity>

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
