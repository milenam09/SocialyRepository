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
  const { goBack, selectedPost, setSelectedPost } = useNavigation();
  const [commentText, setCommentText] = useState('');

  const post = selectedPost || {
    author: 'Milena Mares',
    time: 'hoje as 14:09',
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

  const handleToggleLike = () => {
    setSelectedPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleToggleBookmark = () => {
    setSelectedPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: 'Leonardo Oliveira',
      time: 'agora mesmo',
      text: commentText.trim(),
    };
    setSelectedPost((prev) => ({
      ...prev,
      commentsCount: (prev.commentsCount || 0) + 1,
      comments: [...(prev.comments || []), newComment],
    }));
    setCommentText('');
  };

  const handleShare = () => {
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={32} color="#A33757" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Publicação</Text>

          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-social" size={24} color="#A33757" />
          </TouchableOpacity>
        </View>

        {/* Informações do Autor */}
        <View style={styles.usuario}>
          {post.authorAvatar ? (
            <Image source={{ uri: post.authorAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar} />
          )}
          <View>
            <Text style={styles.nome}>{post.author}</Text>
            <Text style={styles.horario}>{post.time}</Text>
          </View>
        </View>

        {/* Texto da Publicação */}
        <Text style={styles.textoPublicacao}>{post.text}</Text>

        {/* Imagem da Publicação */}
        {post.image ? (
          <Image
            source={{ uri: post.image }}
            style={styles.imagemPublicacao}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagemPublicacao} />
        )}

        {/* Ações: Curtidas, Comentários, Salvar */}
        <View style={styles.acoes}>
          <View style={styles.acoesEsquerda}>
            <TouchableOpacity
              style={styles.acao}
              onPress={handleToggleLike}
              activeOpacity={0.7}
            >
              <Ionicons
                name={post.isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color="#A33757"
              />
              <Text style={styles.numero}>{post.likes}</Text>
            </TouchableOpacity>

            <View style={styles.acao}>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color="#A33757"
              />
              <Text style={styles.numero}>{post.commentsCount}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleToggleBookmark}
            activeOpacity={0.7}
          >
            <Ionicons
              name={post.isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#A33757"
            />
          </TouchableOpacity>
        </View>

        {/* Seção Comentários */}
        <Text style={styles.tituloComentarios}>Comentarios</Text>

        {/* Lista de Comentários */}
        {post.comments &&
          post.comments.map((comment) => (
            <View key={comment.id} style={styles.comentario}>
              {comment.authorAvatar ? (
                <Image source={{ uri: comment.authorAvatar }} style={styles.avatarComentarioImage} />
              ) : (
                <View style={styles.avatarComentario} />
              )}
              <View style={styles.conteudoComentario}>
                <Text style={styles.nomeComentario}>{comment.author}</Text>
                <Text style={styles.horarioComentario}>{comment.time}</Text>
                <Text style={styles.textoComentario}>{comment.text}</Text>
              </View>
            </View>
          ))}

        {/* Campo para adicionar novo comentário */}
        <View style={styles.comentarioWrapper}>
          <TextInput
            style={styles.inputComentario}
            placeholder="Adicione um comentário :"
            placeholderTextColor="#555"
            value={commentText}
            onChangeText={setCommentText}
            onSubmitEditing={handleAddComment}
            returnKeyType="send"
          />
          {commentText.trim().length > 0 && (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleAddComment}
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
  header: {
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
  usuario: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D3D3D3',
    marginRight: 14,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: '#DF5268',
  },
  nome: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111111',
  },
  horario: {
    fontSize: 10,
    color: '#333333',
    marginTop: 2,
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
  acoes: {
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
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  numero: {
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
  comentario: {
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
  avatarComentario: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#A33757',
    marginRight: 12,
  },
  avatarComentarioImage: {
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
  textoComentario: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111111',
    marginTop: 8,
  },
  comentarioWrapper: {
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
  inputComentario: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#111111',
    borderWidth: 0,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  sendButton: {
    padding: 6,
  },
});
