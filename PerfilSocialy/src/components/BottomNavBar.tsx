import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface BottomNavBarProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  onPlusPress?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'perfil',
  onTabPress,
  onPlusPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Tab: Início */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('inicio')}
        activeOpacity={0.7}
      >
        <Feather
          name="home"
          size={24}
          color={activeTab === 'inicio' ? colors.primary : colors.iconMuted}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'inicio' && styles.tabLabelActive,
          ]}
        >
          Início
        </Text>
      </TouchableOpacity>

      {/* Tab: Buscar */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('buscar')}
        activeOpacity={0.7}
      >
        <Feather
          name="search"
          size={24}
          color={activeTab === 'buscar' ? colors.primary : colors.iconMuted}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'buscar' && styles.tabLabelActive,
          ]}
        >
          Buscar
        </Text>
      </TouchableOpacity>

      {/* Botão Central (+) */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => onPlusPress?.()}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={26} color={colors.white} />
      </TouchableOpacity>

      {/* Tab: Notificações */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('notificacoes')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={activeTab === 'notificacoes' ? colors.primary : colors.iconMuted}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'notificacoes' && styles.tabLabelActive,
          ]}
        >
          Notificações
        </Text>
      </TouchableOpacity>

      {/* Tab: Perfil */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('perfil')}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="user"
          size={24}
          color={activeTab === 'perfil' ? colors.primary : colors.iconMuted}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'perfil' && styles.tabLabelActive,
          ]}
        >
          perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.iconMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  centerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
  },
});
