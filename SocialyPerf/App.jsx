import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  Alert,
} from 'react-native';

let ImagePicker = null;
try {
  ImagePicker = require('expo-image-picker');
} catch (err) {
  console.log('ImagePicker indisponível:', err);
}

import {
  ChevronLeft,
  GearSettings,
  CameraBadge,
  GridTabIcon,
  ListTabIcon,
  BookmarkTabIcon,
  HomeIcon,
  SearchIcon,
  NotificationsIcon,
  ProfileIcon,
} from './components/Icons';

const { width } = Dimensions.get('window');

export default function App({ initialPosts, initialAvatar }) {
  const [activeTab, setActiveTab] = useState('grid');
  const [activeNav, setActiveNav] = useState('profile');

  const [avatarUri, setAvatarUri] = useState(initialAvatar || null);

  const [posts, setPosts] = useState(
    initialPosts || [
      { id: '1', image: null },
      { id: '2', image: null },
      { id: '3', image: null },
      { id: '4', image: null },
    ]
  );


  const handlePublishImage = async (index) => {
    if (ImagePicker && ImagePicker.launchImageLibraryAsync) {
      try {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
          Alert.alert(
            'Permissão necessária',
            'Por favor, conceda acesso à sua galeria para publicar uma foto.'
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 0.9,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const selectedUri = result.assets[0].uri;
          setPosts((prevPosts) => {
            const updated = [...prevPosts];
            updated[index] = { ...updated[index], image: selectedUri };
            return updated;
          });
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar a imagem para publicação.');
      }
    } else {
      Alert.alert(
        'Publicação',
        `Toque na publicação ${index + 1}. Você pode definir as fotos via prop initialPosts ou selecionar da galeria.`
      );
    }
  };

  
  
  const handleAddNewPost = async () => {
    const emptyIndex = posts.findIndex((p) => !p.image);
    const targetIndex = emptyIndex !== -1 ? emptyIndex : posts.length - 1;
    handlePublishImage(targetIndex);
  };

  
  const handleSelectAvatar = async () => {
    if (ImagePicker && ImagePicker.launchImageLibraryAsync) {
      try {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
          Alert.alert(
            'Permissão necessária',
            'Por favor, autorize o acesso à galeria para alterar a foto de perfil.'
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.9,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          setAvatarUri(result.assets[0].uri);
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível alterar a foto de perfil.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" translucent={false} />

      <View style={styles.header}>
        <Pressable
          style={styles.headerBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Voltar"
        >
          <ChevronLeft size={24} color="#A33757" />
        </Pressable>

        <Text style={styles.headerTitle}>Perfil</Text>

        <Pressable
          style={styles.headerBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Configurações"
        >
          <GearSettings size={22} color="#A33757" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Pressable
              style={styles.avatarCircle}
              onPress={handleSelectAvatar}
              accessibilityLabel="Alterar foto de perfil"
            >
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} resizeMode="cover" />
              ) : (
                <View style={styles.avatarInner} />
              )}

              <View style={styles.cameraBadgeButton}>
                <CameraBadge size={22} color="#A33757" />
              </View>
            </Pressable>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.userName}>Leonardo Oliveira</Text>
            <Text style={styles.userHandle}>@leo_00</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>publicações</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500</Text>
              <Text style={styles.statLabel}>seguidores</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>seguindo</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>Especialista em marketing digital.</Text>
            <Text style={styles.bioText}>Casado!💍</Text>
          </View>
          <View style={styles.tabsContainer}>
            <Pressable
              style={[styles.tabButton, activeTab === 'grid' && styles.tabButtonActive]}
              onPress={() => setActiveTab('grid')}
              accessibilityLabel="Visualizar em grade"
            >
              <GridTabIcon size={22} color="#A33757" />
            </Pressable>

            <Pressable
              style={[styles.tabButton, activeTab === 'list' && styles.tabButtonActive]}
              onPress={() => setActiveTab('list')}
              accessibilityLabel="Visualizar em lista"
            >
              <ListTabIcon size={22} color="#A33757" />
            </Pressable>

            <Pressable
              style={[styles.tabButton, activeTab === 'saved' && styles.tabButtonActive]}
              onPress={() => setActiveTab('saved')}
              accessibilityLabel="Publicações salvas"
            >
              <BookmarkTabIcon size={22} color="#A33757" />
            </Pressable>
          </View>

          <View style={styles.tabsDivider} />
        </View>

        <View style={styles.postsGrid}>
          {posts.map((post, index) => (
            <View key={post.id || index} style={styles.postCardWrapper}>
              <Pressable
                style={styles.postCard}
                onPress={() => handlePublishImage(index)}
                accessibilityLabel={`Publicação ${index + 1}. Toque para selecionar imagem.`}
              >
                {post.image ? (
                  <Image
                    source={typeof post.image === 'string' ? { uri: post.image } : post.image}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.postPlaceholder} />
                )}
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navItem}
          onPress={() => setActiveNav('home')}
          accessibilityLabel="Início"
        >
          <HomeIcon size={24} color="#1A1A1A" />
          <Text style={styles.navLabel}>Início</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveNav('search')}
          accessibilityLabel="Buscar"
        >
          <SearchIcon size={24} color="#1A1A1A" />
          <Text style={styles.navLabel}>Buscar</Text>
        </Pressable>

        <Pressable
          style={styles.fabItem}
          onPress={handleAddNewPost}
          accessibilityLabel="Publicar nova imagem"
        >
          <View style={styles.fabButton}>
            <Text style={styles.fabPlus}>+</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveNav('notifications')}
          accessibilityLabel="Notificações"
        >
          <NotificationsIcon size={24} color="#1A1A1A" />
          <Text style={styles.navLabel}>Notificações</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveNav('profile')}
          accessibilityLabel="Perfil"
        >
          <ProfileIcon size={24} color="#A33757" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFE9E8',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFE9E8',
  },
  headerBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  profileSection: {
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  cameraBadgeButton: {
    position: 'absolute',
    bottom: -1,
    right: 2,
    padding: 2,
  },

  infoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 13,
    color: '#8E8E93',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 70,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#777777',
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
    lineHeight: 17,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 8,
  },
  tabButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
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
    paddingHorizontal: 14,
    paddingTop: 12,
    rowGap: 14,
  },
  postCardWrapper: {
    width: '48%', 
  },
  postCard: {
    width: '100%',
    height: 190,
    backgroundColor: '#D9D9D9',
    borderWidth: 1.5,
    borderColor: '#DF5268',
    borderRadius: 7,
    overflow: 'hidden',
  },
  postPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },

  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFE9E8',
    borderTopWidth: 1,
    borderTopColor: '#F2BBC4',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'android' ? 34 : 12,
    paddingHorizontal: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#1A1A1A',
    marginTop: 3,
  },
  navLabelActive: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  fabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fabButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#A33757',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  fabPlus: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 26,
    marginTop: -2,
  },
});
