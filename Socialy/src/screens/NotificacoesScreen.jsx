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

export default function NotificacoesScreen() {
  const { notifications, navigate, goBack, setSelectedPost } = useNavigation();

  const handleNotificationPress = (item) => {
    if (item.type === 'heart') {
      setSelectedPost({
        author: item.user,
        time: item.time,
        text: 'Publicação curtida por ' + item.user,
        likes: 24,
        commentsCount: 4,
        isLiked: true,
        isBookmarked: false,
        comments: [
          {
            id: 'c1',
            author: item.user,
            time: item.time,
            text: 'Ficou incrível continua assim!!',
          },
        ],
      });
      navigate('Publicacao');
    } else {
      navigate('Perfil');
    }
  };

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

        <Text style={styles.headerTitle}>Notificações</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Notificações */}
        <View style={styles.notificationsList}>
          {notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.notificationCard}
              onPress={() => handleNotificationPress(item)}
              activeOpacity={0.75}
            >
              {/* Ícone da Notificação (Coração ou Pessoa) */}
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={item.type === 'heart' ? 'heart' : 'person'}
                  size={22}
                  color="#A33757"
                />
              </View>

              {/* Conteúdo da Notificação */}
              <View style={styles.textContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{item.user} </Text>
                  {item.action}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              {/* Seta / Chevron */}
              <Ionicons name="chevron-forward" size={20} color="#DC586D" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar activeTab="notificacoes" />
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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  notificationsList: {
    width: '100%',
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0B8C2',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE8EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 13,
    color: '#111111',
    lineHeight: 18,
  },
  userName: {
    fontWeight: 'bold',
    color: '#DC586D',
  },
  timeText: {
    fontSize: 10,
    color: '#DC586D',
    fontWeight: '600',
    marginTop: 2,
  },
});
