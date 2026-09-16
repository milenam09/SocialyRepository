import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function FeedScreen() {
  const {
    feedPosts,
    toggleLikeFeedPost,
    toggleBookmarkFeedPost,
    navigate,
    setSelectedPost,
  } = useNavigation();

  const handleOpenPost = (post) => {
    setSelectedPost({
      id: post.id,
      author: post.user,
      authorAvatar: post.avatar,
      time: post.time || 'hoje às 14:09',
      text: post.content,
      image: post.image,
      likes: post.likes,
      commentsCount: post.comments,
      isLiked: post.isLiked,
      isBookmarked: post.isBookmarked,
      comments: [
        {
          id: 'c1',
          author: 'Milena Mares',
          authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
          time: 'hoje às 14:09',
          text: 'Ficou incrível continua assim!!',
        },
      ],
    });
    navigate('Publicacao');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEFEF" />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>socialy</Text>
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigate('Navegacao')}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={26} color="#7E2C3F" />
        </TouchableOpacity>
      </View>

      {/* Posts Feed ScrollView */}
      <ScrollView
        style={styles.feedList}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {feedPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header: Avatar & Username */}
            <TouchableOpacity
              style={styles.postHeader}
              onPress={() => navigate('Perfil')}
              activeOpacity={0.8}
            >
              {post.avatar ? (
                <Image source={{ uri: post.avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={18} color="#DE5169" />
                </View>
              )}
              <Text style={styles.username}>{post.user}</Text>
            </TouchableOpacity>

            {/* Post Content */}
            <TouchableOpacity
              onPress={() => handleOpenPost(post)}
              activeOpacity={0.9}
            >
              <Text style={styles.postText}>{post.content}</Text>
              {post.image && (
                <View style={styles.postImageWrapper}>
                  <Image
                    source={{ uri: post.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                </View>
              )}
            </TouchableOpacity>

            {/* Post Actions Footer */}
            <View style={styles.postFooter}>
              <View style={styles.leftActions}>
                {/* Like Button */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => toggleLikeFeedPost(post.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={post.isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={post.isLiked ? '#DE5169' : '#A33757'}
                  />
                  <Text style={styles.actionCount}>{post.likes}</Text>
                </TouchableOpacity>

                {/* Comment Button (abre tela Publicação) */}
                <TouchableOpacity
                  style={[styles.actionBtn, { marginLeft: 16 }]}
                  onPress={() => handleOpenPost(post)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chatbubble-outline" size={19} color="#A33757" />
                  <Text style={styles.actionCount}>{post.comments}</Text>
                </TouchableOpacity>
              </View>

              {/* Bookmark Button */}
              <TouchableOpacity
                onPress={() => toggleBookmarkFeedPost(post.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={post.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={21}
                  color="#A33757"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="inicio" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFEF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    marginRight: 6,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#DE5169',
    letterSpacing: -0.5,
  },
  searchBtn: {
    padding: 6,
  },
  feedList: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E8A8B5',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFE8EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8A8B5',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2A1E22',
    marginLeft: 10,
  },
  postText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#1A0E13',
    marginBottom: 14,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2A1E22',
    marginLeft: 6,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#DF5268',
  },
  postImageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#FFE8EC',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});
