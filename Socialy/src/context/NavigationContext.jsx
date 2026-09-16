import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  // Histórico de navegação para permitir voltar perfeitamente
  const [history, setHistory] = useState([{ screen: 'TelaInicial', params: {} }]);
  
  // Estado global do perfil do usuário
  const [userProfile, setUserProfile] = useState({
    name: 'Leonardo Oliveira',
    username: 'leo_00',
    bio: 'Especialista em marketing digital.\nCasado💍',
    bioEdit: 'Especialista em marketing digital.\nCasado💍',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    stats: {
      publicacoes: 12,
      seguidores: 500,
      seguindo: 80,
    },
  });

  // Estado global das publicações no feed
  const [feedPosts, setFeedPosts] = useState([
    {
      id: '1',
      user: 'bia_fr',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      content: 'Tipo eh tipo uh tipo nd aver',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      likes: 301,
      comments: 33,
      isLiked: false,
      isBookmarked: false,
      time: 'hoje às 13:20',
    },
    {
      id: '2',
      user: 'Lili_00',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
      content: 'Minhas roupas estão secando no varal já tem 3 dias e nada!!!!!',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      likes: 502,
      comments: 502,
      isLiked: false,
      isBookmarked: false,
      time: 'hoje às 12:45',
    },
    {
      id: '3',
      user: 'ogvlenza',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      content: 'Frank Ocean volta nunca?',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      likes: 101,
      comments: 11,
      isLiked: false,
      isBookmarked: false,
      time: 'hoje às 10:15',
    },
  ]);

  // Publicação em destaque (tela Publicação)
  const [selectedPost, setSelectedPost] = useState({
    id: 'post_milena',
    author: 'Milena Mares',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    time: 'hoje as 14:09',
    text: 'Viajando com minha família!!',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    likes: 23,
    commentsCount: 4,
    isLiked: true,
    isBookmarked: false,
    comments: [
      {
        id: 'c1',
        author: 'Milena Mares',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        time: 'hoje as 14:09',
        text: 'Ficou incrível continua assim!!',
      },
    ],
  });

  // Notificações reais da tela 10
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      user: 'Milena',
      action: 'Curtiu sua publicação.',
      time: '5m',
      type: 'heart',
      targetPostId: 'post_milena',
    },
    {
      id: 'n2',
      user: 'Lili_00',
      action: 'Curtiu sua publicação',
      time: '10min',
      type: 'heart',
      targetPostId: '2',
    },
    {
      id: 'n3',
      user: 'Clefairy',
      action: 'Começou a seguir você',
      time: '1hr',
      type: 'user',
    },
    {
      id: 'n4',
      user: 'Clefairy',
      action: 'Curtiu sua publicação.',
      time: '1hr',
      type: 'heart',
      targetPostId: '1',
    },
    {
      id: 'n5',
      user: 'Ronaldo',
      action: 'Curtiu sua publicação',
      time: '1hr',
      type: 'heart',
      targetPostId: '3',
    },
  ]);

  const currentEntry = history[history.length - 1] || { screen: 'TelaInicial', params: {} };
  const currentScreen = currentEntry.screen;
  const currentParams = currentEntry.params;

  const navigate = (screen, params = {}) => {
    setHistory((prev) => [...prev, { screen, params }]);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const reset = (screen, params = {}) => {
    setHistory([{ screen, params }]);
  };

  // Funções de atualização do Feed
  const addFeedPost = (content, image = null) => {
    const newPost = {
      id: Date.now().toString(),
      user: userProfile.username,
      avatar: userProfile.avatar,
      content,
      image,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      time: 'agora mesmo',
    };
    setFeedPosts((prev) => [newPost, ...prev]);
  };

  const toggleLikeFeedPost = (postId) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return { ...p, isLiked, likes: isLiked ? p.likes + 1 : p.likes - 1 };
        }
        return p;
      })
    );
  };

  const toggleBookmarkFeedPost = (postId) => {
    setFeedPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        currentParams,
        navigate,
        goBack,
        reset,
        userProfile,
        setUserProfile,
        feedPosts,
        addFeedPost,
        toggleLikeFeedPost,
        toggleBookmarkFeedPost,
        selectedPost,
        setSelectedPost,
        notifications,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de um NavigationProvider');
  }
  return context;
}
