import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';
import styles from '../styles/FeedScreenStyle';

// =========================================================================
// AQUI FICA O FEED DE PUBLICAÇÕES (ONDE LISTA E EXIBE CADA PUBLICAÇÃO)
// =========================================================================
export default function FeedScreen() {
  const {
    // //aqui fica a lista de publicações vindas do contexto / banco de dados
    publicacoesFeed,
    curtirPublicacao,
    salvarPublicacao,
    navigate,
    definirPublicacaoSelecionada,
  } = useNavigation();

  // //aqui fica onde abre a publicação clicada para ver os detalhes
  const abrirPublicacao = (publicacao) => {
    const comentariosPublicacao =
      Array.isArray(publicacao.commentsList) && publicacao.commentsList.length > 0
        ? publicacao.commentsList
        : [
            {
              id: 'c1',
              author: 'Milena Mares',
              authorAvatar:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
              time: 'hoje às 14:09',
              text: 'Ficou incrível continua assim!!',
            },
          ];

    definirPublicacaoSelecionada({
      id: publicacao.id,
      author: publicacao.user,
      authorAvatar: publicacao.avatar,
      time: publicacao.time || 'hoje às 14:09',
      location: publicacao.location,
      latitude: publicacao.latitude,
      longitude: publicacao.longitude,
      text: publicacao.content,
      image: publicacao.image,
      likes: publicacao.likes,
      commentsCount:
        typeof publicacao.comments === 'number'
          ? publicacao.comments
          : comentariosPublicacao.length,
      isLiked: publicacao.isLiked,
      isBookmarked: publicacao.isBookmarked,
      comments: comentariosPublicacao,
      commentsList: comentariosPublicacao,
    });
    navigate('Publicacao');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundFeed} />

      <View style={styles.cabecalho}>
        <View style={styles.linhaLogo}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.iconeLogo}
            resizeMode="contain"
          />
          <Text style={styles.textoLogo}>socialy</Text>
        </View>
        <TouchableOpacity
          style={styles.botaoPesquisa}
          onPress={() => navigate('Navegacao')}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={26} color={colors.deepMaroon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.listaFeed}
        contentContainerStyle={styles.conteudoFeed}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================================================= */}
        {/* //aqui fica a publicação (loop que renderiza cada publicação no feed) */}
        {/* ========================================================================= */}
        {publicacoesFeed.map((publicacao) => (
          <View key={publicacao.id} style={styles.cartaoPublicacao}>
            {/* //aqui fica o cabeçalho da publicação (avatar, nome do usuário e local) */}
            <TouchableOpacity
              style={styles.cabecalhoPublicacao}
              onPress={() => navigate('Perfil')}
              activeOpacity={0.8}
            >
              {publicacao.avatar ? (
                <Image
                  source={{ uri: publicacao.avatar }}
                  style={styles.imagemAvatar}
                />
              ) : (
                <View style={styles.marcadorAvatar}>
                  <Ionicons name="person" size={18} color={colors.primary} />
                </View>
              )}
              <View style={styles.conteudoCabecalhoPost}>
                <Text style={styles.nomeUsuario}>{publicacao.user}</Text>
                {publicacao.location && (
                  <View style={styles.linhaLocalizacao}>
                    <Ionicons name="location-sharp" size={11} color={colors.primaryVariant} />
                    <Text style={styles.textoLocalizacao}>
                      {publicacao.location}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* //aqui fica o conteúdo da publicação (texto escrito e imagem do post) */}
            <TouchableOpacity
              onPress={() => abrirPublicacao(publicacao)}
              activeOpacity={0.9}
            >
              <Text style={styles.textoPublicacao}>{publicacao.content}</Text>
              {publicacao.image && (
                <View style={styles.embrulhoImagemPost}>
                  <Image
                    source={{ uri: publicacao.image }}
                    style={styles.imagemPost}
                    resizeMode="cover"
                  />
                </View>
              )}
            </TouchableOpacity>

            {/* //aqui fica a barra de interações da publicação (curtir, comentários, salvar) */}
            <View style={styles.rodapePublicacao}>
              <View style={styles.acoesEsquerda}>
                <TouchableOpacity
                  style={styles.botaoAcao}
                  onPress={() => curtirPublicacao(publicacao.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={publicacao.isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={publicacao.isLiked ? colors.primary : colors.maroon}
                  />
                  <Text style={styles.contadorAcao}>{publicacao.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botaoAcao, { marginLeft: 16 }]}
                  onPress={() => abrirPublicacao(publicacao)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={19}
                    color={colors.maroon}
                  />
                  <Text style={styles.contadorAcao}>{publicacao.comments}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => salvarPublicacao(publicacao.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    publicacao.isBookmarked ? 'bookmark' : 'bookmark-outline'
                  }
                  size={21}
                  color={colors.maroon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavBar activeTab="inicio" />
    </SafeAreaView>
  );
}
