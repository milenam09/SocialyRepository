import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import { colors } from '../theme/colors';
import styles from '../styles/BottomNavBarStyle';

export default function BottomNavBar({ activeTab }) {
  const { navigate } = useNavigation();

  const corAtiva = colors.primaryBright;
  const corInativa = colors.maroon;

  return (
    <View style={styles.container}>
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

      <TouchableOpacity
        style={[
          styles.botaoCentral,
          activeTab === 'criar' && styles.botaoCentralAtivo,
        ]}
        onPress={() => navigate('NovaPublicacao')}
        activeOpacity={0.85}
      >
        <Feather name="plus" size={26} color={colors.white} />
      </TouchableOpacity>

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
