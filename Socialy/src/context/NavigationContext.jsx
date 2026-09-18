import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  // Histórico de navegação para permitir voltar perfeitamente
  const [history, setHistory] = useState([{ screen: 'TelaInicial', params: {} }]);

  // Usuário atualmente autenticado
  const [currentUser, setCurrentUser] = useState(null);

  // Estado global do perfil do usuário exibido no app
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

  // =========================================================================
  // //aqui fica a publicação (estado global com a lista de publicações do feed)
  // =========================================================================
  const [feedPosts, setFeedPosts] = useState([
    {
      id: '1',
      user: 'bia_fr',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      content: 'Tipo eh tipo uh tipo nd aver',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      location: 'São Paulo, SP',
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
      location: 'Rio de Janeiro, RJ',
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
      location: null,
      likes: 101,
      comments: 11,
      isLiked: false,
      isBookmarked: false,
      time: 'hoje às 10:15',
    },
  ]);

  // Sincroniza dados da Fake API (json-server) ao inicializar
  useEffect(() => {
    let isMounted = true;
    const syncFromApi = async () => {
      try {
        const [remotePosts, remoteProfile, remoteNotifs] = await Promise.all([
          api.getPosts(),
          api.getProfile(),
          api.getNotifications(),
        ]);

        if (isMounted) {
          if (remotePosts && remotePosts.length > 0) {
            setFeedPosts(remotePosts);
          }
          if (remoteProfile) {
            setUserProfile(remoteProfile);
          }
          if (remoteNotifs && remoteNotifs.length > 0) {
            setNotifications(remoteNotifs);
          }
        }
      } catch (err) {
        console.warn('Erro ao carregar dados da API:', err);
      }
    };

    syncFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================================
  // //aqui fica a publicação (publicação em destaque para a tela PublicacaoScreen)
  // =========================================================================
  const [selectedPost, setSelectedPost] = useState({
    id: 'post_milena',
    author: 'Milena Mares',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    time: 'hoje as 14:09',
    text: 'Viajando com minha família!!',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    location: 'Florianópolis, SC',
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

  const handleSetCurrentUser = (user) => {
    setCurrentUser(user);
    if (user) {
      setUserProfile((prev) => ({
        ...prev,
        id: user.id,
        name: user.name || prev.name,
        username: user.username || prev.username,
        bio: user.bio !== undefined ? user.bio : prev.bio,
        bioEdit: user.bio !== undefined ? user.bio : prev.bioEdit,
        avatar: user.avatar || prev.avatar,
        stats: user.stats || prev.stats,
      }));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    reset('TelaInicial');
  };

  // Funções de atualização do Perfil sincronizadas com a API
  const updateUserProfile = (updater) => {
    setUserProfile((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      api.updateProfile(updated);
      if (currentUser && currentUser.id) {
        api.updateUser(currentUser.id, updated);
      }
      return updated;
    });
  };

  // =========================================================================
  // //aqui fica onde manda a publicação (salva no Feed e envia para a API/DB)
  // =========================================================================
  const addFeedPost = async (content, image = null, location = null, coords = null) => {
    const tempId = Date.now().toString();

    // //aqui monta o objeto da publicação com autor, texto, imagem e coordenadas
    const newPost = {
      id: tempId,
      user: userProfile.username,
      avatar: userProfile.avatar,
      content,
      image,
      location,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
      coords: coords ? { latitude: coords.latitude, longitude: coords.longitude } : null,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      time: 'agora mesmo',
    };

    // //aqui insere a nova publicação no estado local do feed
    setFeedPosts((prev) => [newPost, ...prev]);

    // //aqui manda a publicação para a API / banco de dados (json-server)
    try {
      const serverPost = await api.createPost(newPost);
      if (serverPost && serverPost.id && serverPost.id !== tempId) {
        setFeedPosts((prev) =>
          prev.map((p) => (p.id === tempId ? { ...p, id: serverPost.id } : p))
        );
      }
    } catch (err) {
      console.warn('Erro ao sincronizar ID do post com a API:', err);
    }
  };

  // Função para criar e persistir notificação na API
  const addNotification = (notif) => {
    const newNotif = {
      id: Date.now().toString(),
      time: 'agora mesmo',
      type: 'heart',
      ...notif,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    api.createNotification(newNotif);
  };

  const toggleLikeFeedPost = (postId) => {
    let likedPost = null;
    let willBeLiked = false;

    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          willBeLiked = !p.isLiked;
          likedPost = p;
          const updatedLikes = willBeLiked ? p.likes + 1 : p.likes - 1;
          api.updatePost(postId, { isLiked: willBeLiked, likes: updatedLikes });
          return { ...p, isLiked: willBeLiked, likes: updatedLikes };
        }
        return p;
      })
    );

    // Se acabou de curtir a publicação, gera notificação adequada na Fake API
    if (willBeLiked && likedPost) {
      const isMyOwnPost = likedPost.user === userProfile.username;
      if (isMyOwnPost) {
        // Se a publicação é sua, gera notificação de um seguidor/amigo que curtiu seu post
        const sampleUsers = ['Milena', 'Bia', 'Lili_00', 'Clefairy', 'Ronaldo'];
        const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
        addNotification({
          user: randomUser,
          action: 'curtiu sua publicação.',
          targetPostId: postId,
        });
      }
    }
  };

  const toggleBookmarkFeedPost = (postId) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          api.updatePost(postId, { isBookmarked });
          return { ...p, isBookmarked };
        }
        return p;
      })
    );
  };

  // Função para adicionar e persistir comentário na publicação
  const addCommentToPost = async (postId, text) => {
    if (!text || !text.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: userProfile.name || 'Usuário',
      authorAvatar: userProfile.avatar || null,
      time: 'agora mesmo',
      text: text.trim(),
    };

    setSelectedPost((prev) => {
      if (!prev) return prev;
      const currentList = prev.commentsList || prev.comments || [];
      const updatedList = [...currentList, newComment];
      return {
        ...prev,
        commentsCount: (prev.commentsCount || 0) + 1,
        comments: updatedList,
        commentsList: updatedList,
      };
    });

    setFeedPosts((prev) =>
      prev.map((p) => {
        if (String(p.id) === String(postId)) {
          const currentList = p.commentsList || [];
          const updatedList = [...currentList, newComment];
          return {
            ...p,
            comments: (p.comments || 0) + 1,
            commentsList: updatedList,
          };
        }
        return p;
      })
    );

    try {
      await api.addComment(postId, newComment);
    } catch (err) {
      console.warn('Erro ao salvar comentário na API:', err);
    }

    return newComment;
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        currentParams,
        navigate,
        goBack,
        reset,
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        logout,
        userProfile,
        setUserProfile: updateUserProfile,
        feedPosts,
        publicacoesFeed: feedPosts,
        addFeedPost,
        toggleLikeFeedPost,
        curtirPublicacao: toggleLikeFeedPost,
        toggleBookmarkFeedPost,
        salvarPublicacao: toggleBookmarkFeedPost,
        selectedPost,
        publicacaoSelecionada: selectedPost,
        setSelectedPost,
        definirPublicacaoSelecionada: setSelectedPost,
        addCommentToPost,
        adicionarComentario: addCommentToPost,
        notifications,
        addNotification,
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
