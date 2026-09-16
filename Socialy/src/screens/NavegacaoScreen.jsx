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

  const navItems = [
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={30} color="#A33757" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Navegação</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtítulo explicativo */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>
            A navegação principal do app na{'\n'}barra inferior, através dos ícones.
          </Text>
        </View>

        {/* Lista de Cartões Informativos de Navegação */}
        <View style={styles.cardsContainer}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.navCard}
              onPress={item.action}
              activeOpacity={0.75}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={28} color="#A33757" />
              </View>

              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar activeTab="buscar" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE9E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subtitleText: {
    fontSize: 14,
    color: '#615E5E',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
    gap: 12,
  },
  navCard: {
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
  iconContainer: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 12,
    color: '#777777',
  },
});
