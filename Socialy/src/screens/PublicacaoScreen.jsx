import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function PublicacaoScreen() {
  const {
    goBack,
    selectedPost,
    setSelectedPost,
    addNotification,
    userProfile,
    addCommentToPost,
  } = useNavigation();

  const [textoComentario, setTextoComentario] = useState('');

  const publicacao = selectedPost || {
    id: 'post_milena',
    author: 'Milena Mares',
    time: 'hoje as 14:09',
    location: 'Florianópolis, SC',
    text: 'Viajando com minha família!!',
    likes: 23,
    commentsCount: 4,
    isLiked: true,
    isBookmarked: false,
    comments: [
      {
        id: 'c1',
        author: 'Milena Mares',
        time: 'hoje as 14:09',
        text: 'Ficou incrível continua assim!!',
      },
    ],
  };

  // Função para curtir / descurtir a publicação
  const alternarCurtida = () => {
    setSelectedPost((prev) => {
      const seraCurtido = !prev.isLiked;
      if (seraCurtido && addNotification) {
        const ehMeuProprioPost = prev.author === userProfile?.username;
        if (ehMeuProprioPost) {
          const usuariosAmostra = ['Milena', 'Bia', 'Lili_00', 'Clefairy', 'Ronaldo'];
          const usuarioAleatorio =
            usuariosAmostra[Math.floor(Math.random() * usuariosAmostra.length)];
          addNotification({
            user: usuarioAleatorio,
            action: 'curtiu sua publicação.',
            targetPostId: prev.id,
          });
        }
      }
      return {
        ...prev,
        isLiked: seraCurtido,
        likes: seraCurtido ? prev.likes + 1 : prev.likes - 1,
      };
    });
  };

  // Função para favoritar / salvar publicação
  const alternarSalvar = () => {
    setSelectedPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  };

  // Função para enviar novo comentário
  const enviarComentario = () => {
    const textoFormatado = textoComentario.trim();
    if (!textoFormatado) return;
    if (addCommentToPost && publicacao.id) {
      addCommentToPost(publicacao.id, textoFormatado);
    }
    setTextoComentario('');
  };

  // Função para compartilhar publicação
  const compartilharPublicacao = () => {
    Alert.alert('Compartilhar', 'Link da publicação copiado para a área de transferência!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4F4" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={32} color="#A33757" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Publicação</Text>

          <TouchableOpacity
            onPress={compartilharPublicacao}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-social" size={24} color="#A33757" />
          </TouchableOpacity>
        </View>

        {/* Informações do Autor */}
        <View style={styles.usuarioContainer}>
          {publicacao.authorAvatar ? (
            <Image
              source={{ uri: publicacao.authorAvatar }}
              style={styles.imagemAvatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
          <View>
            <Text style={styles.nomeAutor}>{publicacao.author}</Text>
            <View style={styles.linhaMetadados}>
              <Text style={styles.horarioPublicacao}>{publicacao.time}</Text>
              {publicacao.location && (
                <View style={styles.linhaLocalizacao}>
                  <Text style={styles.separadorPonto}>•</Text>
                  <Ionicons name="location-sharp" size={11} color="#DC586D" />
                  <Text style={styles.textoLocalizacaoDetalhe}>
                    {publicacao.location}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Texto da Publicação */}
        <Text style={styles.textoPublicacao}>{publicacao.text}</Text>

        {/* Imagem da Publicação */}
        {publicacao.image ? (
          <Image
            source={{ uri: publicacao.image }}
            style={styles.imagemPublicacao}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagemPublicacao} />
        )}

        {/* Barra de Ações (Curtir, Comentar e Salvar) */}
        <View style={styles.acoesBarra}>
          <View style={styles.acoesEsquerda}>
            <TouchableOpacity
              style={styles.itemAcao}
              onPress={alternarCurtida}
              activeOpacity={0.7}
            >
              <Ionicons
                name={publicacao.isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color="#A33757"
              />
              <Text style={styles.contadorAcao}>{publicacao.likes}</Text>
            </TouchableOpacity>

            <View style={styles.itemAcao}>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color="#A33757"
              />
              <Text style={styles.contadorAcao}>{publicacao.commentsCount}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={alternarSalvar}
            activeOpacity={0.7}
          >
            <Ionicons
              name={publicacao.isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#A33757"
            />
          </TouchableOpacity>
        </View>

        {/* Título da Seção de Comentários */}
        <Text style={styles.tituloComentarios}>Comentários</Text>

        {/* Lista de Comentários */}
        {publicacao.comments &&
          publicacao.comments.map((comentario) => (
            <View key={comentario.id} style={styles.cartaoComentario}>
              {comentario.authorAvatar ? (
                <Image
                  source={{ uri: comentario.authorAvatar }}
                  style={styles.imagemAvatarComentario}
                />
              ) : (
                <View style={styles.marcadorAvatarComentario} />
              )}
              <View style={styles.conteudoComentario}>
                <Text style={styles.nomeComentario}>{comentario.author}</Text>
                <Text style={styles.horarioComentario}>{comentario.time}</Text>
                <Text style={styles.textoConteudoComentario}>{comentario.text}</Text>
              </View>
            </View>
          ))}

        {/* Formulário para Adicionar Comentário */}
        <View style={styles.formularioComentario}>
          <TextInput
            style={styles.campoTextoComentario}
            placeholder="Adicione um comentário :"
            placeholderTextColor="#555"
            value={textoComentario}
            onChangeText={setTextoComentario}
            onSubmitEditing={enviarComentario}
            returnKeyType="send"
          />
          {textoComentario.trim().length > 0 && (
            <TouchableOpacity
              style={styles.botaoEnviarComentario}
              onPress={enviarComentario}
            >
              <Ionicons name="send" size={18} color="#A33757" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar activeTab="inicio" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4F4',
  },
  conteudo: {
    paddingBottom: 20,
  },
  cabecalho: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  usuarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 8,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D3D3D3',
    marginRight: 14,
  },
  imagemAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: '#DF5268',
  },
  nomeAutor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111111',
  },
  linhaMetadados: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  horarioPublicacao: {
    fontSize: 10,
    color: '#333333',
  },
  linhaLocalizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  separadorPonto: {
    fontSize: 10,
    color: '#DC586D',
    marginRight: 1,
  },
  textoLocalizacaoDetalhe: {
    fontSize: 10,
    color: '#DC586D',
    fontWeight: '600',
  },
  textoPublicacao: {
    fontSize: 15,
    color: '#111111',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  imagemPublicacao: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFE8EC',
    overflow: 'hidden',
  },
  acoesBarra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },
  acoesEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  itemAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contadorAcao: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '600',
  },
  tituloComentarios: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  cartaoComentario: {
    flexDirection: 'row',
    backgroundColor: '#CBA8B1',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 10,
    minHeight: 84,
    marginBottom: 12,
    shadowColor: '#4D1D3D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  marcadorAvatarComentario: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#A33757',
    marginRight: 12,
  },
  imagemAvatarComentario: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#DF5268',
  },
  conteudoComentario: {
    flex: 1,
    paddingTop: 1,
  },
  nomeComentario: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111111',
  },
  horarioComentario: {
    fontSize: 9,
    color: '#222222',
    marginTop: 2,
  },
  textoConteudoComentario: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111111',
    marginTop: 8,
  },
  formularioComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 17,
    borderRadius: 7,
    paddingHorizontal: 12,
    height: 57,
    marginBottom: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  campoTextoComentario: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#111111',
    borderWidth: 0,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoEnviarComentario: {
    padding: 6,
  },
});
