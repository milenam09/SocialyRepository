import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NavigationCard } from '../components/NavigationCard';
import { BottomNavBar, TabKey } from '../components/BottomNavBar';

interface NavigationScreenProps {
  onBackPress?: () => void;
}

export const NavigationScreen: React.FC<NavigationScreenProps> = ({
  onBackPress,
}: NavigationScreenProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('perfil');

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="chevron-left" size={32} color={colors.iconMaroon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Navegação</Text>

          {/* Espaçador para manter o título perfeitamente centralizado */}
          <View style={styles.headerSpacer} />
        </View>

        {/* Subtítulo explicativo */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>
            A navegação principal do app na{'\n'}
            barra inferior, através dos ícones.
          </Text>
        </View>

        {/* Lista de Cartões Informativos */}
        <View style={styles.cardsContainer}>
          <NavigationCard
            iconType="home"
            title="Início"
            description="Feed de publicações"
            onPress={() => setActiveTab('inicio')}
          />

          <NavigationCard
            iconType="search"
            title="Buscar"
            description="Procurar pessoas e conteúdo"
            onPress={() => setActiveTab('buscar')}
          />

          <NavigationCard
            iconType="create"
            title="Criar"
            description="Criar nova publicação"
            onPress={() => setActiveTab('criar')}
          />

          <NavigationCard
            iconType="notifications"
            title="Notificações"
            description="Ver interações e atividades"
            onPress={() => setActiveTab('notificacoes')}
          />

          <NavigationCard
            iconType="profile"
            title="Perfil"
            description="Visualizar e editar perfil"
            onPress={() => setActiveTab('perfil')}
          />
        </View>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar
        activeTab={activeTab}
        onTabPress={(tab: TabKey) => setActiveTab(tab)}
        onPlusPress={() => setActiveTab('criar')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subtitleText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '400',
  },
  cardsContainer: {
    width: '100%',
  },
});
