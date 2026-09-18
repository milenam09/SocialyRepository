import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function PerfilScreen() {
  const {
    userProfile,
    setUserProfile,
    navigate,
    goBack,
    setSelectedPost,
    feedPosts,
  } = useNavigation();

  // Estado da aba selecionada: 'grade', 'lista' ou 'salvos'
  const [abaAtiva, setAbaAtiva] = useState('grade');

  // Publicações próprias do perfil
  const [publicacoes, setPublicacoes] = useState([
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      caption: 'Dia de praia inesquecível! ☀️🌊',
      likes: 184,
      comments: 24,
    },
    {
      id: '2',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
      caption: 'Cafézinho e foco total nas metas ☕✨',
      likes: 129,
      comments: 15,
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      caption: 'Arquitetura urbana impressionante 🏙️',
      likes: 245,
      comments: 31,
    },
    {
      id: '4',
      image:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      caption: 'Passeio com meu melhor amigo 🐶❤️',
      likes: 312,
      comments: 42,
    },
  ]);

  // Função para alterar foto de perfil via câmera ou galeria
  const selecionarFotoPerfil = async () => {
    Alert.alert('Foto de Perfil', 'Como deseja alterar sua foto?', [
      {
        text: '📸 Tirar Foto Agora (Câmera)',
        onPress: async () => {
          try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Permissão da Câmera necessária',
                'Precisamos de permissão para acessar sua câmera e tirar sua nova foto de perfil.'
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
              const uriFoto = resultado.assets[0].uri;
              setUserProfile((prev) => ({
                ...prev,
                avatar: uriFoto,
              }));
              Alert.alert('Sucesso!', 'Foto de perfil capturada pela câmera atualizada com sucesso!');
            }
          } catch (erro) {
            console.error('Erro ao tirar foto:', erro);
            Alert.alert('Erro', 'Não foi possível abrir a câmera.');
          }
        },
      },
      {
        text: '🖼️ Escolher da Galeria',
        onPress: async () => {
          try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Permissão necessária',
                'Precisamos de permissão para acessar a galeria de fotos.'
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
              const uriEscolhida = resultado.assets[0].uri;
              setUserProfile((prev) => ({
                ...prev,
                avatar: uriEscolhida,
              }));
              Alert.alert('Sucesso!', 'Sua foto de perfil foi atualizada com a imagem da galeria!');
            }
          } catch (erro) {
            console.error('Erro ao escolher foto:', erro);
            Alert.alert('Erro', 'Não foi possível acessar a galeria.');
          }
        },
      },
      {
        text: 'Editar Perfil Completo',
        onPress: () => navigate('EditarPerfil'),
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  // Função para abrir o detalhe de uma publicação própria
  const abrirDetalhePublicacao = (itemPublicacao, index) => {
    setSelectedPost({
      id: `perfil_post_${itemPublicacao.id}`,
      author: userProfile.name,
      authorAvatar: userProfile.avatar,
      time: 'publicado recentemente',
      text: itemPublicacao.caption,
      image: itemPublicacao.image,
      likes: itemPublicacao.likes,
      commentsCount: itemPublicacao.comments,
      isLiked: false,
      isBookmarked: false,
      comments: [
        {
          id: 'c1',
          author: 'Milena Mares',
          authorAvatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
          time: 'há 1 hora',
          text: 'Que foto linda! Parabéns! 👏✨',
        },
      ],
    });
    navigate('Publicacao');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" />

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.botaoCabecalho}
        >
          <Ionicons name="chevron-back" size={28} color="#A33757" />
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>Perfil</Text>

        <TouchableOpacity
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.botaoCabecalho}
        >
          <Ionicons name="settings-sharp" size={24} color="#A33757" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo de Rolagem */}
      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção do Avatar */}
        <View style={styles.secaoAvatar}>
          <TouchableOpacity
            style={styles.circuloAvatar}
            onPress={selecionarFotoPerfil}
            activeOpacity={0.85}
          >
            {userProfile.avatar ? (
              <Image source={{ uri: userProfile.avatar }} style={styles.imagemAvatar} />
            ) : (
              <View style={styles.marcadorAvatar} />
            )}

            <View style={styles.distintivoCamera}>
              <Ionicons name="camera" size={16} color="#A33757" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Informações do Usuário */}
        <View style={styles.informacoesUsuario}>
          <Text style={styles.nomeUsuario}>{userProfile.name}</Text>
          <Text style={styles.arrobaUsuario}>@{userProfile.username}</Text>
        </View>

        {/* Linha de Estatísticas */}
        <View style={styles.linhaEstatisticas}>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.publicacoes}</Text>
            <Text style={styles.rotuloEstatistica}>publicações</Text>
          </View>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.seguidores}</Text>
            <Text style={styles.rotuloEstatistica}>seguidores</Text>
          </View>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.seguindo}</Text>
            <Text style={styles.rotuloEstatistica}>seguindo</Text>
          </View>
        </View>

        {/* Biografia */}
        <TouchableOpacity
          style={styles.containerBiografia}
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBiografia}>
            {userProfile.bio || userProfile.bioEdit || 'Especialista em marketing digital.\nCasado💍'}
          </Text>
        </TouchableOpacity>

        {/* Linha das 3 Abas (Grade, Lista e Salvos) */}
        <View style={styles.linhaAbas}>
          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'grade' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('grade')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'grade' ? 'grid' : 'grid-outline'}
              size={22}
              color={abaAtiva === 'grade' ? '#DF5268' : '#A33757'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'lista' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('lista')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'lista' ? 'reorder-three' : 'reorder-three-outline'}
              size={28}
              color={abaAtiva === 'lista' ? '#DF5268' : '#A33757'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'salvos' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('salvos')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'salvos' ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={abaAtiva === 'salvos' ? '#DF5268' : '#A33757'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divisorAbas} />

        {/* 1. Visualização em Grade */}
        {abaAtiva === 'grade' && (
          <View style={styles.gradePublicacoes}>
            {publicacoes.map((itemPublicacao, index) => (
              <TouchableOpacity
                key={itemPublicacao.id}
                style={styles.cartaoGradePublicacao}
                onPress={() => abrirDetalhePublicacao(itemPublicacao, index)}
                activeOpacity={0.85}
              >
                {itemPublicacao.image ? (
                  <Image
                    source={{ uri: itemPublicacao.image }}
                    style={styles.imagemPublicacao}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.marcadorPublicacao} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 2. Visualização em Lista */}
        {abaAtiva === 'lista' && (
          <View style={styles.listaPublicacoes}>
            {publicacoes.map((itemPublicacao, index) => (
              <TouchableOpacity
                key={itemPublicacao.id}
                style={styles.cartaoListaPublicacao}
                onPress={() => abrirDetalhePublicacao(itemPublicacao, index)}
                activeOpacity={0.85}
              >
                {itemPublicacao.image && (
                  <Image
                    source={{ uri: itemPublicacao.image }}
                    style={styles.imagemListaPublicacao}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.infoListaPublicacao}>
                  <Text style={styles.legendaListaPublicacao}>
                    {itemPublicacao.caption}
                  </Text>
                  <View style={styles.acoesListaPublicacao}>
                    <View style={styles.itemAcaoLista}>
                      <Ionicons name="heart" size={16} color="#DF5268" />
                      <Text style={styles.textoAcaoLista}>{itemPublicacao.likes}</Text>
                    </View>
                    <View style={[styles.itemAcaoLista, { marginLeft: 16 }]}>
                      <Ionicons name="chatbubble-outline" size={15} color="#A33757" />
                      <Text style={styles.textoAcaoLista}>{itemPublicacao.comments}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 3. Visualização de Publicações Salvas */}
        {abaAtiva === 'salvos' && (
          <View style={styles.containerSalvos}>
            {feedPosts && feedPosts.filter((p) => p.isBookmarked).length > 0 ? (
              <View style={styles.gradePublicacoes}>
                {feedPosts
                  .filter((p) => p.isBookmarked)
                  .map((postSalvo) => (
                    <TouchableOpacity
                      key={postSalvo.id}
                      style={styles.cartaoGradePublicacao}
                      onPress={() => {
                        setSelectedPost({
                          ...postSalvo,
                          commentsCount: postSalvo.comments,
                          comments: postSalvo.commentsList || [],
                        });
                        navigate('Publicacao');
                      }}
                      activeOpacity={0.85}
                    >
                      {postSalvo.image ? (
                        <Image
                          source={{ uri: postSalvo.image }}
                          style={styles.imagemPublicacao}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.marcadorPublicacao}>
                          <Text style={styles.textoMarcadorPublicacao} numberOfLines={3}>
                            {postSalvo.content}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
              </View>
            ) : (
              <View style={styles.caixaSalvosVazia}>
                <Ionicons name="bookmark-outline" size={44} color="#DF5268" />
                <Text style={styles.tituloSalvosVazio}>Nenhuma publicação salva</Text>
                <Text style={styles.subtituloSalvosVazio}>
                  Toque no ícone de salvar no feed para guardar suas publicações favoritas aqui.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Barra Inferior */}
      <BottomNavBar activeTab="perfil" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE9E8',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  botaoCabecalho: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloCabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  rolagemTela: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingBottom: 20,
  },
  secaoAvatar: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  circuloAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#DF5268',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemAvatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  marcadorAvatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#E8A8B5',
  },
  distintivoCamera: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DF5268',
    elevation: 2,
  },
  informacoesUsuario: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    letterSpacing: -0.3,
  },
  arrobaUsuario: {
    fontSize: 13,
    color: '#A33757',
    marginTop: 2,
  },
  linhaEstatisticas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    gap: 24,
  },
  itemEstatistica: {
    alignItems: 'center',
  },
  numeroEstatistica: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  rotuloEstatistica: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  containerBiografia: {
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  textoBiografia: {
    fontSize: 12,
    color: '#222222',
    textAlign: 'center',
    lineHeight: 16,
  },
  linhaAbas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 6,
  },
  botaoAba: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  botaoAbaAtiva: {
    borderBottomColor: '#DF5268',
  },
  divisorAbas: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8A8B5',
    opacity: 0.5,
  },
  gradePublicacoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    rowGap: 14,
  },
  cartaoGradePublicacao: {
    width: '48%',
    height: 180,
    backgroundColor: '#FFE8EC',
    borderWidth: 1.5,
    borderColor: '#DF5268',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemPublicacao: {
    width: '100%',
    height: '100%',
  },
  marcadorPublicacao: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFE8EC',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoMarcadorPublicacao: {
    fontSize: 12,
    color: '#A33757',
    textAlign: 'center',
  },
  listaPublicacoes: {
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 14,
  },
  cartaoListaPublicacao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#E8A8B5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemListaPublicacao: {
    width: '100%',
    height: 200,
  },
  infoListaPublicacao: {
    padding: 12,
  },
  legendaListaPublicacao: {
    fontSize: 14,
    color: '#2A1E22',
    lineHeight: 19,
    marginBottom: 8,
  },
  acoesListaPublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAcaoLista: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoAcaoLista: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2A1E22',
    marginLeft: 5,
  },
  containerSalvos: {
    paddingBottom: 20,
  },
  caixaSalvosVazia: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  tituloSalvosVazio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A1E22',
    marginTop: 12,
    marginBottom: 6,
  },
  subtituloSalvosVazio: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
