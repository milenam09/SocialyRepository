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
import styles from '../styles/NavegacaoScreenStyle';

export default function NavegacaoScreen() {
  const { navigate, goBack } = useNavigation();

  const itensNavegacao = [
    {
      id: 'inicio',
      title: 'Início',
      description: 'Feed de publicações',
      icon: 'home',
      action: () => navigate('Feed'),
    },
    {
      id: 'buscar',
      title: 'Buscar',
      description: 'Procurar pessoas e conteúdo',
      icon: 'search',
      action: () => navigate('Navegacao'),
    },
    {
      id: 'criar',
      title: 'Criar',
      description: 'Criar nova publicação',
      icon: 'add-circle-outline',
      action: () => navigate('NovaPublicacao'),
    },
    {
      id: 'notificacoes',
      title: 'Notificações',
      description: 'Ver interações e atividades',
      icon: 'notifications-outline',
      action: () => navigate('Notificacoes'),
    },
    {
      id: 'perfil',
      title: 'Perfil',
      description: 'Visualizar e editar perfil',
      icon: 'person',
      action: () => navigate('Perfil'),
    },
  ];

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

        <Text style={styles.tituloCabecalho}>Navegação</Text>

        <View style={styles.espacadorCabecalho} />
      </View>

      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerSubtitulo}>
          <Text style={styles.textoSubtitulo}>
            A navegação principal do app na{'\n'}barra inferior, através dos ícones.
          </Text>
        </View>

        <View style={styles.containerCartoes}>
          {itensNavegacao.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cartaoNavegacao}
              onPress={item.action}
              activeOpacity={0.75}
            >
              <View style={styles.containerIcone}>
                <Ionicons name={item.icon} size={28} color={colors.maroon} />
              </View>

              <View style={styles.containerTextoCartao}>
                <Text style={styles.tituloCartao}>{item.title}</Text>
                <Text style={styles.descricaoCartao}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar activeTab="buscar" />
    </SafeAreaView>
  );
}
