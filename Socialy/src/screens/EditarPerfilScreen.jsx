import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

export default function EditarPerfilScreen() {
  const { userProfile, setUserProfile, goBack, navigate, logout } = useNavigation();

  const [nome, setNome] = useState(userProfile.name);
  const [usuario, setUsuario] = useState(userProfile.username);
  const [biografia, setBiografia] = useState(
    userProfile.bio || userProfile.bioEdit || 'Especialista em marketing digital.\nCasado💍'
  );
  const [uriAvatar, setUriAvatar] = useState(userProfile.avatar);

  // Função para salvar as alterações do perfil
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

  // Função para tirar foto com a câmera
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

  // Função para escolher foto da galeria
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

  // Diálogo para escolher entre câmera ou galeria
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" />
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.botaoVoltar}
          >
            <Ionicons name="chevron-back" size={30} color="#A33757" />
          </TouchableOpacity>
          <Text style={styles.tituloCabecalho}>Editar Perfil</Text>
          <View style={styles.espacadorCabecalho} />
        </View>

        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Seção do Avatar */}
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
                <Ionicons name="camera" size={16} color="#F0435F" />
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

          {/* Formulário de Edição */}
          <View style={styles.formularioContainer}>
            {/* Campo Nome */}
            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Nome</Text>
              <TextInput
                style={styles.campoTexto}
                value={nome}
                onChangeText={setNome}
                placeholder="Leonardo Oliveira"
                placeholderTextColor="#999"
              />
            </View>

            {/* Campo Usuário */}
            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Usuário</Text>
              <TextInput
                style={styles.campoTexto}
                value={usuario}
                onChangeText={setUsuario}
                placeholder="leo_00"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>

            {/* Campo Biografia */}
            <View style={styles.grupoCampo}>
              <Text style={styles.rotulo}>Bio</Text>
              <TextInput
                style={[styles.campoTexto, styles.campoTextoBiografia]}
                value={biografia}
                onChangeText={setBiografia}
                placeholder="Oi, bem vindos ao meu Perfil"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Botão Salvar Alterações */}
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarAlteracoes}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoSalvar}>Salvar Alterações</Text>
            </TouchableOpacity>

            {/* Botão Sair da Conta */}
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
                color="#DF5268"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.textoBotaoSairConta}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Barra Inferior */}
        <BottomNavBar activeTab="perfil" />
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
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  botaoVoltar: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tituloCabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
  },
  espacadorCabecalho: {
    width: 36,
  },
  conteudoRolagem: {
    paddingTop: 10,
    paddingBottom: 24,
  },
  secaoAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  circuloAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DF5268',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  marcadorAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
  },
  imagemAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  distintivoCamera: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#F0435F',
  },
  botaoAlterarFoto: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textoAlterarFoto: {
    fontSize: 13,
    color: '#F0435F',
    fontWeight: '700',
  },
  formularioContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  grupoCampo: {
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  campoTexto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DF7182',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111111',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  campoTextoBiografia: {
    height: 80,
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoSalvar: {
    backgroundColor: '#F0435F',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#F0435F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoSairConta: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DF5268',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoSairConta: {
    color: '#DF5268',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
