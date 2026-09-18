import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function NotificacoesScreen() {
  const { notifications, navigate, goBack, setSelectedPost, feedPosts } = useNavigation();

  // Função para navegar até a publicação ou perfil ao tocar na notificação
  const abrirDetalheNotificacao = (notificacao) => {
    if (notificacao.type === 'heart') {
      const publicacaoReal = feedPosts?.find(
        (p) => String(p.id) === String(notificacao.targetPostId)
      );
      if (publicacaoReal) {
        setSelectedPost({
          id: publicacaoReal.id,
          author: publicacaoReal.user,
          authorAvatar: publicacaoReal.avatar,
          time: publicacaoReal.time || notificacao.time,
          location: publicacaoReal.location,
          text: publicacaoReal.content,
          image: publicacaoReal.image,
          likes: publicacaoReal.likes,
          commentsCount: publicacaoReal.comments,
          isLiked: publicacaoReal.isLiked,
          isBookmarked: publicacaoReal.isBookmarked,
          comments: [
            {
              id: 'c1',
              author: 'Milena Mares',
              authorAvatar:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
              time: 'hoje às 14:09',
              text: 'Ficou incrível continua assim!!',
            },
          ],
        });
      } else {
        setSelectedPost({
          id: notificacao.targetPostId || 'post_milena',
          author: 'Milena Mares',
          authorAvatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
          time: notificacao.time,
          location: 'Florianópolis, SC',
          text: 'Viajando com minha família!!',
          image:
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
          likes: 24,
          commentsCount: 4,
          isLiked: true,
          isBookmarked: false,
          comments: [
            {
              id: 'c1',
              author: 'Milena Mares',
              authorAvatar:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
              time: notificacao.time,
              text: 'Ficou incrível continua assim!!',
            },
          ],
        });
      }
      navigate('Publicacao');
    } else {
      navigate('Perfil');
    }
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
          style={styles.botaoVoltar}
        >
          <Ionicons name="chevron-back" size={30} color="#A33757" />
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>Notificações</Text>

        <View style={styles.espacadorCabecalho} />
      </View>

      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Notificações */}
        <View style={styles.listaNotificacoes}>
          {notifications.map((notificacao) => (
            <TouchableOpacity
              key={notificacao.id}
              style={styles.cartaoNotificacao}
              onPress={() => abrirDetalheNotificacao(notificacao)}
              activeOpacity={0.75}
            >
              {/* Ícone */}
              <View style={styles.iconeContainer}>
                <Ionicons
                  name={notificacao.type === 'heart' ? 'heart' : 'person'}
                  size={22}
                  color="#A33757"
                />
              </View>

              {/* Texto da Notificação */}
              <View style={styles.conteudoTexto}>
                <Text style={styles.textoNotificacao}>
                  <Text style={styles.nomeUsuario}>{notificacao.user} </Text>
                  {notificacao.action}
                </Text>
                <Text style={styles.textoHorario}>{notificacao.time}</Text>
              </View>

              {/* Seta indicativa */}
              <Ionicons name="chevron-forward" size={20} color="#DC586D" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra Inferior */}
      <BottomNavBar activeTab="notificacoes" />
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
  rolagemTela: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  listaNotificacoes: {
    width: '100%',
    gap: 12,
  },
  cartaoNotificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0B8C2',
  },
  iconeContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE8EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  conteudoTexto: {
    flex: 1,
    justifyContent: 'center',
  },
  textoNotificacao: {
    fontSize: 13,
    color: '#111111',
    lineHeight: 18,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    color: '#DC586D',
  },
  textoHorario: {
    fontSize: 10,
    color: '#DC586D',
    fontWeight: '600',
    marginTop: 2,
  },
});
