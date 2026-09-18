import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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
import styles from '../styles/PerfilScreenStyle';

export default function PerfilScreen() {
  const {
    userProfile,
    setUserProfile,
    navigate,
    goBack,
    setSelectedPost,
    feedPosts,
  } = useNavigation();

  const [abaAtiva, setAbaAtiva] = useState('grade');

  const [publicacoes, setPublicacoes] = useState([
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      caption: 'Dia de praia inesquecível! ☀️🌊',
      likes: 184,
      comments: 24,
    },
    {
      id: '2',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
      caption: 'Cafézinho e foco total nas metas ☕✨',
      likes: 129,
      comments: 15,
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      caption: 'Arquitetura urbana impressionante 🏙️',
      likes: 245,
      comments: 31,
    },
    {
      id: '4',
      image:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      caption: 'Passeio com meu melhor amigo 🐶❤️',
      likes: 312,
      comments: 42,
    },
  ]);

  const selecionarFotoPerfil = async () => {
    Alert.alert('Foto de Perfil', 'Como deseja alterar sua foto?', [
      {
        text: '📸 Tirar Foto Agora (Câmera)',
        onPress: async () => {
          try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Permissão da Câmera necessária',
                'Precisamos de permissão para acessar sua câmera e tirar sua nova foto de perfil.'
              );
              return;
            }

            const resultado = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.85,
            });

            if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
              const uriFoto = resultado.assets[0].uri;
              setUserProfile((prev) => ({
                ...prev,
                avatar: uriFoto,
              }));
              Alert.alert('Sucesso!', 'Foto de perfil capturada pela câmera atualizada com sucesso!');
            }
          } catch (erro) {
            console.error('Erro ao tirar foto:', erro);
            Alert.alert('Erro', 'Não foi possível abrir a câmera.');
          }
        },
      },
      {
        text: '🖼️ Escolher da Galeria',
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

            const resultado = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.85,
            });

            if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
              const uriFoto = resultado.assets[0].uri;
              setUserProfile((prev) => ({
                ...prev,
                avatar: uriFoto,
              }));
              Alert.alert('Sucesso!', 'Foto de perfil atualizada da galeria com sucesso!');
            }
          } catch (erro) {
            console.error('Erro ao escolher imagem:', erro);
            Alert.alert('Erro', 'Não foi possível acessar a galeria.');
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const abrirDetalhePublicacao = (item, index) => {
    const listaComentariosPrevia = [
      {
        id: 'cp1',
        author: 'Milena Mares',
        time: 'hoje às 14:09',
        text: 'Ficou incrível continua assim!!',
      },
      {
        id: 'cp2',
        author: 'Bia',
        time: 'ontem às 19:30',
        text: 'Amei essa foto, maravilhosa! ❤️',
      },
    ];

    setSelectedPost({
      id: `perfil_post_${item.id}`,
      author: userProfile.name,
      authorAvatar: userProfile.avatar,
      time: 'Publicado recentemente',
      location: 'Brasil',
      text: item.caption,
      image: item.image,
      likes: item.likes,
      commentsCount: item.comments,
      isLiked: false,
      isBookmarked: false,
      comments: listaComentariosPrevia,
      commentsList: listaComentariosPrevia,
    });
    navigate('Publicacao');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.botaoCabecalho}
        >
          <Ionicons name="chevron-back" size={28} color={colors.maroon} />
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>Perfil</Text>

        <TouchableOpacity
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.botaoCabecalho}
        >
          <Ionicons name="settings-sharp" size={24} color={colors.maroon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.rolagemTela}
        contentContainerStyle={styles.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secaoAvatar}>
          <TouchableOpacity
            style={styles.circuloAvatar}
            onPress={selecionarFotoPerfil}
            activeOpacity={0.85}
          >
            {userProfile.avatar ? (
              <Image source={{ uri: userProfile.avatar }} style={styles.imagemAvatar} />
            ) : (
              <View style={styles.marcadorAvatar} />
            )}

            <View style={styles.distintivoCamera}>
              <Ionicons name="camera" size={16} color={colors.maroon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.informacoesUsuario}>
          <Text style={styles.nomeUsuario}>{userProfile.name}</Text>
          <Text style={styles.arrobaUsuario}>@{userProfile.username}</Text>
        </View>

        <View style={styles.linhaEstatisticas}>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.publicacoes}</Text>
            <Text style={styles.rotuloEstatistica}>publicações</Text>
          </View>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.seguidores}</Text>
            <Text style={styles.rotuloEstatistica}>seguidores</Text>
          </View>
          <View style={styles.itemEstatistica}>
            <Text style={styles.numeroEstatistica}>{userProfile.stats.seguindo}</Text>
            <Text style={styles.rotuloEstatistica}>seguindo</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.containerBiografia}
          onPress={() => navigate('EditarPerfil')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBiografia}>
            {userProfile.bio || userProfile.bioEdit || 'Especialista em marketing digital.\nCasado💍'}
          </Text>
        </TouchableOpacity>

        <View style={styles.linhaAbas}>
          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'grade' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('grade')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'grade' ? 'grid' : 'grid-outline'}
              size={22}
              color={abaAtiva === 'grade' ? colors.primary : colors.maroon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'lista' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('lista')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'lista' ? 'reorder-three' : 'reorder-three-outline'}
              size={28}
              color={abaAtiva === 'lista' ? colors.primary : colors.maroon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAba, abaAtiva === 'salvos' && styles.botaoAbaAtiva]}
            onPress={() => setAbaAtiva('salvos')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={abaAtiva === 'salvos' ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={abaAtiva === 'salvos' ? colors.primary : colors.maroon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divisorAbas} />

        {abaAtiva === 'grade' && (
          <View style={styles.gradePublicacoes}>
            {publicacoes.map((itemPublicacao, index) => (
              <TouchableOpacity
                key={itemPublicacao.id}
                style={styles.cartaoGradePublicacao}
                onPress={() => abrirDetalhePublicacao(itemPublicacao, index)}
                activeOpacity={0.85}
              >
                {itemPublicacao.image ? (
                  <Image
                    source={{ uri: itemPublicacao.image }}
                    style={styles.imagemPublicacao}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.marcadorPublicacao} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {abaAtiva === 'lista' && (
          <View style={styles.listaPublicacoes}>
            {publicacoes.map((itemPublicacao, index) => (
              <TouchableOpacity
                key={itemPublicacao.id}
                style={styles.cartaoListaPublicacao}
                onPress={() => abrirDetalhePublicacao(itemPublicacao, index)}
                activeOpacity={0.85}
              >
                {itemPublicacao.image && (
                  <Image
                    source={{ uri: itemPublicacao.image }}
                    style={styles.imagemListaPublicacao}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.infoListaPublicacao}>
                  <Text style={styles.legendaListaPublicacao}>
                    {itemPublicacao.caption}
                  </Text>
                  <View style={styles.acoesListaPublicacao}>
                    <View style={styles.itemAcaoLista}>
                      <Ionicons name="heart" size={16} color={colors.primary} />
                      <Text style={styles.textoAcaoLista}>{itemPublicacao.likes}</Text>
                    </View>
                    <View style={[styles.itemAcaoLista, { marginLeft: 16 }]}>
                      <Ionicons name="chatbubble-outline" size={15} color={colors.maroon} />
                      <Text style={styles.textoAcaoLista}>{itemPublicacao.comments}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {abaAtiva === 'salvos' && (
          <View style={styles.containerSalvos}>
            {feedPosts && feedPosts.filter((p) => p.isBookmarked).length > 0 ? (
              <View style={styles.gradePublicacoes}>
                {feedPosts
                  .filter((p) => p.isBookmarked)
                  .map((postSalvo) => (
                    <TouchableOpacity
                      key={postSalvo.id}
                      style={styles.cartaoGradePublicacao}
                      onPress={() => {
                        setSelectedPost({
                          ...postSalvo,
                          commentsCount: postSalvo.comments,
                          comments: postSalvo.commentsList || [],
                        });
                        navigate('Publicacao');
                      }}
                      activeOpacity={0.85}
                    >
                      {postSalvo.image ? (
                        <Image
                          source={{ uri: postSalvo.image }}
                          style={styles.imagemPublicacao}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.marcadorPublicacao}>
                          <Text style={styles.textoMarcadorPublicacao} numberOfLines={3}>
                            {postSalvo.content}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
              </View>
            ) : (
              <View style={styles.caixaSalvosVazia}>
                <Ionicons name="bookmark-outline" size={44} color={colors.primary} />
                <Text style={styles.tituloSalvosVazio}>Nenhuma publicação salva</Text>
                <Text style={styles.subtituloSalvosVazio}>
                  Toque no ícone de salvar no feed para guardar suas publicações favoritas aqui.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <BottomNavBar activeTab="perfil" />
    </SafeAreaView>
  );
}
