import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';

export default function BottomNavBar({ activeTab }) {
  const { navigate } = useNavigation();

  const corAtiva = '#F0435F';
  const corInativa = '#A33757';

  return (
    <View style={styles.container}>
      {/* Início */}
      <TouchableOpacity
        style={styles.itemAba}
        onPress={() => navigate('Feed')}
        activeOpacity={0.7}
      >
        <Feather
          name="home"
          size={24}
          color={activeTab === 'inicio' ? corAtiva : corInativa}
        />
        <Text
          style={[
            styles.rotuloAba,
            activeTab === 'inicio' && styles.rotuloAbaAtiva,
          ]}
        >
          Início
        </Text>
        {activeTab === 'inicio' && <View style={styles.pontoAtivo} />}
      </TouchableOpacity>

      {/* Buscar */}
      <TouchableOpacity
        style={styles.itemAba}
        onPress={() => navigate('Navegacao')}
        activeOpacity={0.7}
      >
        <Feather
          name="search"
          size={24}
          color={activeTab === 'buscar' ? corAtiva : corInativa}
        />
        <Text
          style={[
            styles.rotuloAba,
            activeTab === 'buscar' && styles.rotuloAbaAtiva,
          ]}
        >
          Buscar
        </Text>
        {activeTab === 'buscar' && <View style={styles.pontoAtivo} />}
      </TouchableOpacity>

      {/* Botão Central (+) Criar */}
      <TouchableOpacity
        style={[
          styles.botaoCentral,
          activeTab === 'criar' && styles.botaoCentralAtivo,
        ]}
        onPress={() => navigate('NovaPublicacao')}
        activeOpacity={0.85}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Notificações */}
      <TouchableOpacity
        style={styles.itemAba}
        onPress={() => navigate('Notificacoes')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'notificacoes' ? 'notifications' : 'notifications-outline'}
          size={24}
          color={activeTab === 'notificacoes' ? corAtiva : corInativa}
        />
        <Text
          style={[
            styles.rotuloAba,
            activeTab === 'notificacoes' && styles.rotuloAbaAtiva,
          ]}
        >
          Notificações
        </Text>
        {activeTab === 'notificacoes' && <View style={styles.pontoAtivo} />}
      </TouchableOpacity>

      {/* Perfil */}
      <TouchableOpacity
        style={styles.itemAba}
        onPress={() => navigate('Perfil')}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="user"
          size={22}
          color={activeTab === 'perfil' ? corAtiva : corInativa}
        />
        <Text
          style={[
            styles.rotuloAba,
            activeTab === 'perfil' && styles.rotuloAbaAtiva,
          ]}
        >
          Perfil
        </Text>
        {activeTab === 'perfil' && <View style={styles.pontoAtivo} />}
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
  itemAba: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 55,
  },
  rotuloAba: {
    fontSize: 11,
    color: '#A33757',
    marginTop: 4,
    fontWeight: '500',
  },
  rotuloAbaAtiva: {
    color: '#F0435F',
    fontWeight: '700',
  },
  pontoAtivo: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F0435F',
    marginTop: 3,
  },
  botaoCentral: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DC586D',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#DC586D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoCentralAtivo: {
    backgroundColor: '#F0435F',
    shadowColor: '#F0435F',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.08 }],
    elevation: 5,
  },
});
