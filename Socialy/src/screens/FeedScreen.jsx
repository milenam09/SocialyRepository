import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,Image,StyleSheet,SafeAreaView, StatusBar,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function FeedScreen() {
  const {publicacoesFeed,curtirPublicacao,salvarPublicacao,navigate,definirPublicacaoSelecionada,} = useNavigation();

 
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFEFEF" />

     
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
          <Ionicons name="search-outline" size={26} color="#7E2C3F" />
        </TouchableOpacity>
      </View>

     
      <ScrollView
        style={styles.listaFeed}
        contentContainerStyle={styles.conteudoFeed}
        showsVerticalScrollIndicator={false}
      >
        {publicacoesFeed.map((publicacao) => (
          <View key={publicacao.id} style={styles.cartaoPublicacao}>
            
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
                  <Ionicons name="person" size={18} color="#DE5169" />
                </View>
              )}
              <View style={styles.conteudoCabecalhoPost}>
                <Text style={styles.nomeUsuario}>{publicacao.user}</Text>
                {publicacao.location && (
                  <View style={styles.linhaLocalizacao}>
                    <Ionicons name="location-sharp" size={11} color="#DC586D" />
                    <Text style={styles.textoLocalizacao}>
                      {publicacao.location}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

           
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
                    color={publicacao.isLiked ? '#DE5169' : '#A33757'}
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
                    color="#A33757"
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
                  color="#A33757"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFEF',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  linhaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeLogo: {
    width: 48,
    height: 48,
    marginRight: -4,
  },
  textoLogo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DE5169',
    letterSpacing: -0.5,
  },
  botaoPesquisa: {
    padding: 6,
  },
  listaFeed: {
    flex: 1,
  },
  conteudoFeed: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  cartaoPublicacao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E8A8B5',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cabecalhoPublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  marcadorAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFE8EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8A8B5',
  },
  nomeUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2A1E22',
  },
  conteudoCabecalhoPost: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  linhaLocalizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  textoLocalizacao: {
    fontSize: 11,
    color: '#DC586D',
    fontWeight: '600',
  },
  textoPublicacao: {
    fontSize: 15,
    lineHeight: 21,
    color: '#1A0E13',
    marginBottom: 14,
  },
  rodapePublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  acoesEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contadorAcao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2A1E22',
    marginLeft: 6,
  },
  imagemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#DF5268',
  },
  embrulhoImagemPost: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#FFE8EC',
  },
  imagemPost: {
    width: '100%',
    height: '100%',
  },
});
