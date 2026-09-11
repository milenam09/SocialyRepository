import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type TabKey =
  | 'inicio'
  | 'buscar'
  | 'criar'
  | 'notificacoes'
  | 'perfil';

interface BottomNavBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
  onPlusPress?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'perfil',
  onTabPress,
  onPlusPress,
}) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('inicio')}
      >
        <Feather
          name="home"
          size={24}
          color={colors.iconMaroon}
        />
        <Text style={styles.tabLabel}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('buscar')}
      >
        <Feather
          name="search"
          size={24}
          color={colors.iconMaroon}
        />
        <Text style={styles.tabLabel}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centroButton}
        onPress={() => {
          onPlusPress?.();
          onTabPress?.('criar');
        }}
      >
        <Feather
          name="plus"
          size={26}
          color={colors.white}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('notificacoes')}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.iconMaroon}
        />
        <Text style={styles.tabLabel}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress?.('perfil')}
      >
        <FontAwesome
          name="user"
          size={22}
          color={colors.iconMaroon}
        />
        <Text style={styles.tabLabel}>Perfil</Text>
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
    minWidth: 55,
  },

  tabLabel: {
    fontSize: 11,
    color: colors.iconMaroon,
    marginTop: 4,
    fontWeight: '500',
  },

  centroButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});