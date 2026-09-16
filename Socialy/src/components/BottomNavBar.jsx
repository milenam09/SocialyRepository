import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';

export default function BottomNavBar({ activeTab }) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      {/* Início */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate('Feed')}
        activeOpacity={0.7}
      >
        <Feather
          name="home"
          size={24}
          color="#A33757"
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

      {/* Buscar */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate('Navegacao')}
        activeOpacity={0.7}
      >
        <Feather
          name="search"
          size={24}
          color="#A33757"
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

      {/* Botão Central (+) Criar */}
      <TouchableOpacity
        style={styles.centroButton}
        onPress={() => navigate('NovaPublicacao')}
        activeOpacity={0.85}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Notificações */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate('Notificacoes')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#A33757"
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

      {/* Perfil */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate('Perfil')}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="user"
          size={22}
          color="#A33757"
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'perfil' && styles.tabLabelActive,
          ]}
        >
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFE9E8',
    borderTopWidth: 1,
    borderTopColor: '#F0B8C2',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 55,
  },
  tabLabel: {
    fontSize: 11,
    color: '#A33757',
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  centroButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0435F',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#F0435F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
