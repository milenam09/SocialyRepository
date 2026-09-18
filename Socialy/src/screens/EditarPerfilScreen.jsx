import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';
import styles from '../styles/EditarPerfilScreenStyle';

export default function EditarPerfilScreen() {
  const { userProfile, setUserProfile, goBack, navigate, logout } = useNavigation();

  const [nome, setNome] = useState(userProfile.name);
  const [usuario, setUsuario] = useState(userProfile.username);
  const [biografia, setBiografia] = useState(
    userProfile.bio || userProfile.bioEdit || 'Especialista em marketing digital.\nCasado💍'
  );
  const [uriAvatar, setUriAvatar] = useState(userProfile.avatar);

  const salvarAlteracoes = () => {
    setUserProfile((prev) => ({
      ...prev,
      name: nome,
      username: usuario,
      bio: biografia,
      bioEdit: biografia,
      avatar: uriAvatar,
    }));
    Alert.alert('Sucesso', 'Perfil e bio atualizados com sucesso!', [
      { text: 'OK', onPress: () => navigate('Perfil') },
    ]);
  };

  const tirarFotoCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão da Câmera necessária',
          'Precisamos de permissão para acessar sua câmera e tirar sua foto de perfil.'
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const fotoTirada = resultado.assets[0].uri;
        setUriAvatar(fotoTirada);
        setUserProfile((prev) => ({ ...prev, avatar: fotoTirada }));
        Alert.alert('Sucesso!', 'Nova foto capturada pela câmera com sucesso!');
      }
    } catch (erro) {
      console.error('Erro ao abrir câmera:', erro);
      Alert.alert('Erro na Câmera', 'Não foi possível inicializar a câmera do dispositivo.');
    }
  };

  const escolherFotoGaleria = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar a galeria de fotos para alterar seu avatar.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const fotoEscolhida = resultado.assets[0].uri;
        setUriAvatar(fotoEscolhida);
        setUserProfile((prev) => ({ ...prev, avatar: fotoEscolhida }));
        Alert.alert('Foto selecionada', 'Nova foto de perfil carregada da galeria!');
      }
    } catch (erro) {
      console.error('Erro ao escolher avatar:', erro);
      Alert.alert('Erro', 'Não foi possível acessar a galeria de fotos.');
    }
  };

  const alterarFotoPerfil = () => {
    Alert.alert('Alterar Foto de Perfil', 'Como deseja definir sua nova foto de perfil?', [
      {
        text: '📸 Tirar Foto Agora (Câmera)',
        onPress: tirarFotoCamera,
      },
      {
        text: '🖼️ Escolher da Galeria',
        onPress: escolherFotoGaleria,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.botaoVoltar}
          >
            <Ionicons name="chevron-back" size={30} color={colors.maroon} />
          </TouchableOpacity>
          <Text style={styles.tituloCabecalho}>Editar Perfil</Text>
          <View style={styles.espacadorCabecalho} />
        </View>

        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.secaoAvatar}>
            <TouchableOpacity
              onPress={alterarFotoPerfil}
              activeOpacity={0.85}
              style={styles.circuloAvatar}
            >
              {uriAvatar || userProfile.avatar ? (
                <Image
                  source={{ uri: uriAvatar || userProfile.avatar }}
                  style={styles.imagemAvatar}
                />
              ) : (
                <View style={styles.marcadorAvatar} />
              )}

              <View style={styles.distintivoCamera}>
                <Ionicons name="camera" size={16} color={colors.primaryBright} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={alterarFotoPerfil}
              activeOpacity={0.7}
              style={styles.botaoAlterarFoto}
            >
              <Text style={styles.textoAlterarFoto}>Alterar foto de perfil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formularioContainer}>
            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Nome</Text>
              <TextInput
                style={styles.campoTexto}
                value={nome}
                onChangeText={setNome}
                placeholder="Leonardo Oliveira"
                placeholderTextColor={colors.placeholderGray}
              />
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Usuário</Text>
              <TextInput
                style={styles.campoTexto}
                value={usuario}
                onChangeText={setUsuario}
                placeholder="leo_00"
                placeholderTextColor={colors.placeholderGray}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Bio</Text>
              <TextInput
                style={[styles.campoTexto, styles.campoTextoBiografia]}
                value={biografia}
                onChangeText={setBiografia}
                placeholder="Oi, bem vindos ao meu Perfil"
                placeholderTextColor={colors.placeholderGray}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarAlteracoes}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoSalvar}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSairConta}
              onPress={() => {
                Alert.alert('Sair da Conta', 'Deseja realmente sair da sua conta?', [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Sair', style: 'destructive', onPress: logout },
                ]);
              }}
              activeOpacity={0.85}
            >
              <Ionicons
                name="log-out-outline"
                size={18}
                color={colors.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.textoBotaoSairConta}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNavBar activeTab="perfil" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
