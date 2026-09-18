import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';
import styles from '../styles/PublicacaoScreenStyle';

// ==============================================================
// AQUI FICA A TELA DE DETALHES DA PUBLICAÇÃO E SEUS COMENTÁRIOS
// ==============================================================
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

  // =========================================================================
  // //aqui fica a publicação (dados do post aberto: autor, texto, imagem, likes)
  // =========================================================================
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

  const alternarSalvar = () => {
    setSelectedPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  };

  // =========================================================================
  // //aqui fica onde manda o comentário da publicação (dispara o envio)
  // =========================================================================
  const enviarComentario = () => {
    const textoFormatado = textoComentario.trim();
    if (!textoFormatado) return;
    if (addCommentToPost && publicacao.id) {
      addCommentToPost(publicacao.id, textoFormatado);
    }
    setTextoComentario('');
  };

  const compartilharPublicacao = () => {
    Alert.alert('Compartilhar', 'Link da publicação copiado para a área de transferência!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundPost} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={32} color={colors.maroon} />
          </TouchableOpacity>

          <Text style={styles.titulo}>Publicação</Text>

          <TouchableOpacity
            onPress={compartilharPublicacao}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-social" size={24} color={colors.maroon} />
          </TouchableOpacity>
        </View>

        {/* ========================================================================= */}
        {/* //aqui fica a publicação (exibição do autor, data e local do post) */}
        {/* ========================================================================= */}
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
                  <Ionicons name="location-sharp" size={11} color={colors.primaryVariant} />
                  <Text style={styles.textoLocalizacaoDetalhe}>
                    {publicacao.location}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* //aqui fica o texto e a imagem da publicação */}
        <Text style={styles.textoPublicacao}>{publicacao.text}</Text>

        {publicacao.image ? (
          <Image
            source={{ uri: publicacao.image }}
            style={styles.imagemPublicacao}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagemPublicacao} />
        )}

        {/* //aqui fica a barra de ações da publicação (curtida, comentário, salvar) */}
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
                color={publicacao.isLiked ? colors.primary : colors.maroon}
              />
              <Text style={styles.contadorAcao}>{publicacao.likes}</Text>
            </TouchableOpacity>

            <View style={styles.itemAcao}>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={colors.maroon}
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
              color={colors.maroon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloComentarios}>Comentários</Text>

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

        {/* ========================================================================= */}
        {/* //aqui fica onde manda o comentário da publicação (campo e botão de envio) */}
        {/* ========================================================================= */}
        <View style={styles.formularioComentario}>
          <TextInput
            style={styles.campoTextoComentario}
            placeholder="Adicione um comentário :"
            placeholderTextColor={colors.textSecondary}
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
              <Ionicons name="send" size={18} color={colors.maroon} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <BottomNavBar activeTab="inicio" />
    </SafeAreaView>
  );
}
