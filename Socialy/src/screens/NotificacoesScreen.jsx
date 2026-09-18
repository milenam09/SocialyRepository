import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';
import styles from '../styles/NotificacoesScreenStyle';

export default function NotificacoesScreen() {
  const { notifications, navigate, goBack, setSelectedPost, feedPosts } = useNavigation();

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.botaoVoltar}
        >
          <Ionicons name="chevron-back" size={30} color={colors.maroon} />
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>Notificações</Text>

        <View style={styles.espacadorCabecalho} />
      </View>

      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listaNotificacoes}>
          {notifications.map((notificacao) => (
            <TouchableOpacity
              key={notificacao.id}
              style={styles.cartaoNotificacao}
              onPress={() => abrirDetalheNotificacao(notificacao)}
              activeOpacity={0.75}
            >
              <View style={styles.iconeContainer}>
                <Ionicons
                  name={notificacao.type === 'heart' ? 'heart' : 'person'}
                  size={22}
                  color={colors.maroon}
                />
              </View>

              <View style={styles.conteudoTexto}>
                <Text style={styles.textoNotificacao}>
                  <Text style={styles.nomeUsuario}>{notificacao.user} </Text>
                  {notificacao.action}
                </Text>
                <Text style={styles.textoHorario}>{notificacao.time}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={colors.primaryVariant} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar activeTab="notificacoes" />
    </SafeAreaView>
  );
}
