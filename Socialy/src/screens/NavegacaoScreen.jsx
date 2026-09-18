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

export default function NavegacaoScreen() {
  const { navigate, goBack } = useNavigation();

  // Lista dos destinos de navegação disponíveis
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

        <Text style={styles.tituloCabecalho}>Navegação</Text>

        <View style={styles.espacadorCabecalho} />
      </View>

      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtítulo explicativo */}
        <View style={styles.containerSubtitulo}>
          <Text style={styles.textoSubtitulo}>
            A navegação principal do app na{'\n'}barra inferior, através dos ícones.
          </Text>
        </View>

        {/* Cartões de navegação */}
        <View style={styles.containerCartoes}>
          {itensNavegacao.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cartaoNavegacao}
              onPress={item.action}
              activeOpacity={0.75}
            >
              <View style={styles.containerIcone}>
                <Ionicons name={item.icon} size={28} color="#A33757" />
              </View>

              <View style={styles.containerTextoCartao}>
                <Text style={styles.tituloCartao}>{item.title}</Text>
                <Text style={styles.descricaoCartao}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra Inferior */}
      <BottomNavBar activeTab="buscar" />
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  containerSubtitulo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textoSubtitulo: {
    fontSize: 14,
    color: '#615E5E',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  containerCartoes: {
    width: '100%',
    gap: 12,
  },
  cartaoNavegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0B8C2',
  },
  containerIcone: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  containerTextoCartao: {
    flex: 1,
  },
  tituloCartao: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  descricaoCartao: {
    fontSize: 12,
    color: '#777777',
  },
});
