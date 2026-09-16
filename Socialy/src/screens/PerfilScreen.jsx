import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function PerfilScreen() {
  const { userProfile, setUserProfile, navigate, goBack, setSelectedPost } = useNavigation();
  const [activeTab, setActiveTab] = useState('grid');

  const [posts, setPosts] = useState([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      caption: 'Dia de praia inesquecível! ☀️🌊',
      likes: 184,
      comments: 24,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
      caption: 'Cafézinho e foco total nas metas ☕✨',
      likes: 129,
      comments: 15,
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      caption: 'Arquitetura urbana impressionante 🏙️',
      likes: 245,
      comments: 31,
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      caption: 'Passeio com meu melhor amigo 🐶❤️',
      likes: 312,
      comments: 42,
    },
  ]);

  const handleSelectAvatar = async () => {
    Alert.alert(
      'Foto de Perfil',
      'Como deseja alterar sua foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Escolher da Galeria',
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert(
                  'Permissão necessária',
                  'Precisamos de permissão para acessar a galeria de fotos.'
                );
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.85,
              });

              if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedUri = result.assets[0].uri;
                setUserProfile((prev) => ({
                  ...prev,
                  avatar: pickedUri,
                }));
                Alert.alert('Sucesso!', 'Sua foto de perfil foi atualizada com a imagem da galeria!');
              }
            } catch (err) {
              console.error('Erro ao escolher foto:', err);
              Alert.alert('Erro', 'Não foi possível acessar a galeria.');
            }
          },
        },
        {
          text: 'Editar Perfil Completo',
          onPress: () => navigate('EditarPerfil'),
        },
      ]
    );
  };

  const handlePostPress = (post, index) => {
    setSelectedPost({
      id: `perfil_post_${post.id}`,
      author: userProfile.name,
      authorAvatar: userProfile.avatar,
      time: 'publicado recentemente',
      text: post.caption,
      image: post.image,
      likes: post.likes,
      commentsCount: post.comments,
      isLiked: false,
      isBookmarked: false,
      comments: [
        {
          id: 'c1',
          author: 'Milena Mares',
          authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
          time: 'há 1 hora',
          text: 'Que foto linda! Parabéns! 👏✨',
        },
      ],
    });
    navigate('Publicacao');
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
          style={styles.headerBtn}
        >
          <Ionicons name="chevron-back" size={28} color="#A33757" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Perfil</Text>

        <TouchableOpacity
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerBtn}
        >
          <Ionicons name="settings-sharp" size={24} color="#A33757" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Scrollável */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar com Badge de Câmera */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarCircle}
            onPress={handleSelectAvatar}
            activeOpacity={0.85}
          >
            {userProfile.avatar ? (
              <Image source={{ uri: userProfile.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarInner} />
            )}

            {/* Badge da Câmera */}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color="#A33757" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Nome e @ de Usuário */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userHandle}>@{userProfile.username}</Text>
        </View>

        {/* Estatísticas (Publicações, Seguidores, Seguindo) */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.publicacoes}</Text>
            <Text style={styles.statLabel}>publicações</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.seguidores}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.seguindo}</Text>
            <Text style={styles.statLabel}>seguindo</Text>
          </View>
        </View>

        {/* Bio Dinâmica */}
        <TouchableOpacity
          style={styles.bioContainer}
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.8}
        >
          <Text style={styles.bioText}>
            {userProfile.bio || userProfile.bioEdit || 'Especialista em marketing digital.\nCasado💍'}
          </Text>
        </TouchableOpacity>

        {/* Abas (Grade, Lista, Salvos) */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'grid' && styles.tabBtnActive]}
            onPress={() => setActiveTab('grid')}
          >
            <Ionicons name="grid-outline" size={22} color="#A33757" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'list' && styles.tabBtnActive]}
            onPress={() => setActiveTab('list')}
          >
            <Ionicons name="reorder-three-outline" size={28} color="#A33757" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'saved' && styles.tabBtnActive]}
            onPress={() => setActiveTab('saved')}
          >
            <Ionicons name="bookmark-outline" size={22} color="#A33757" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsDivider} />

        {/* Grade de 4 Publicações em 2 Colunas */}
        <View style={styles.postsGrid}>
          {posts.map((post, index) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => handlePostPress(post, index)}
              activeOpacity={0.85}
            >
              {post.image ? (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.postPlaceholder} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar activeTab="perfil" />
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
  headerBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#DF5268',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#DF5268',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  userHandle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  statLabel: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  bioContainer: {
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  bioText: {
    fontSize: 12,
    color: '#222222',
    textAlign: 'center',
    lineHeight: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 6,
  },
  tabBtn: {
    padding: 6,
    alignItems: 'center',
  },
  tabBtnActive: {
    opacity: 1,
  },
  tabsDivider: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#DF5268',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    rowGap: 14,
  },
  postCard: {
    width: '48%',
    height: 180,
    backgroundColor: '#FFE8EC',
    borderWidth: 1.5,
    borderColor: '#DF5268',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFE8EC',
  },
});
