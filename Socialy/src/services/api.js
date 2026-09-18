import { Platform } from 'react-native';
const DEV_PC_IP = '172.16.2.146';
const BASE_URL = Platform.OS === 'web' ? 'http://localhost:3000' : `http://${DEV_PC_IP}:3000`;

const TIMEOUT_MS = 4000;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const api = {
 
  async getPosts() {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/posts`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('API getPosts offline, usando fallback local:', err.message);
      return null;
    }
  },

  async createPost(post) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API createPost offline, salvando localmente:', err.message);
      return post;
    }
  },

  async updatePost(postId, updates) {
    try {
     
      if (String(postId).startsWith('perfil_post_')) {
        return null;
      }

      const response = await fetchWithTimeout(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });

      if (response.status === 404) {
        
        return null;
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API updatePost offline:', err.message);
      return null;
    }
  },

  async addComment(postId, comment) {
    try {
      if (String(postId).startsWith('perfil_post_')) {
        return null;
      }

      const response = await fetchWithTimeout(`${BASE_URL}/posts/${postId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const post = await response.json();

      const existingComments = Array.isArray(post.commentsList)
        ? post.commentsList
        : [
            {
              id: 'c1',
              author: 'Milena Mares',
              authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
              time: 'hoje às 14:09',
              text: 'Ficou incrível continua assim!!',
            },
          ];

      const updatedComments = [...existingComments, comment];
      const updatedCount = updatedComments.length;

      const patchRes = await fetchWithTimeout(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          commentsList: updatedComments,
          comments: updatedCount,
        }),
      });

      if (!patchRes.ok) throw new Error(`HTTP ${patchRes.status}`);
      return await patchRes.json();
    } catch (err) {
      console.warn('API addComment offline:', err.message);
      return null;
    }
  },

  
  async getProfile() {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/profile`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API getProfile offline, usando fallback local:', err.message);
      return null;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/profile`, {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API updateProfile offline, salvando localmente:', err.message);
      return profileData;
    }
  },


  async getNotifications() {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/notifications`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API getNotifications offline:', err.message);
      return null;
    }
  },

  async createNotification(notification) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/notifications`, {
        method: 'POST',
        body: JSON.stringify(notification),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API createNotification offline, mantendo localmente:', err.message);
      return notification;
    }
  },

  
  async getUsers() {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/users`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('API getUsers offline:', err.message);
      return [];
    }
  },

  async registerUser(userData) {
    try {
     
      const currentUsers = await this.getUsers();
      const emailLower = (userData.email || '').trim().toLowerCase();
      const existingUser = currentUsers.find(
        (u) => u.email && u.email.trim().toLowerCase() === emailLower
      );

      if (existingUser) {
        throw new Error('Este e-mail já está cadastrado.');
      }

     
      const cleanUsername =
        userData.username ||
        emailLower.split('@')[0].replace(/[^a-z0-9_]/g, '') ||
        'usuario';

      const newUser = {
        id: Date.now().toString(),
        name: (userData.name || '').trim(),
        username: cleanUsername,
        email: emailLower,
        password: userData.password,
        bio: userData.bio || 'Novo no Socialy! 👋',
        avatar:
          userData.avatar ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        stats: {
          publicacoes: 0,
          seguidores: 0,
          seguindo: 0,
        },
      };

      const response = await fetchWithTimeout(`${BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      if (err.message === 'Este e-mail já está cadastrado.') {
        throw err;
      }
      console.warn('API registerUser com erro:', err.message);
      throw new Error(err.message || 'Erro ao cadastrar usuário na API.');
    }
  },

  async loginUser(email, password) {
    try {
      const emailLower = (email || '').trim().toLowerCase();
      const users = await this.getUsers();

      if (!users || users.length === 0) {
        throw new Error('Não foi possível conectar à API ou nenhum usuário encontrado. Verifique se o servidor está ligado.');
      }

      const matchedUser = users.find(
        (u) =>
          u.email &&
          u.email.trim().toLowerCase() === emailLower &&
          u.password === password
      );

      if (!matchedUser) {
        throw new Error('E-mail ou senha incorretos.');
      }

      return matchedUser;
    } catch (err) {
      console.warn('API loginUser erro:', err.message);
      throw err;
    }
  },

  async updateUser(userId, updates) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('API updateUser offline:', err.message);
      return null;
    }
  },
};
