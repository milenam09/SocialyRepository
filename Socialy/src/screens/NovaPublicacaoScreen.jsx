import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';

export default function NovaPublicacaoScreen() {
  const { goBack, navigate, addFeedPost } = useNavigation();
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [feeling, setFeeling] = useState(null);

  const handleClose = () => {
    if (text.trim() || imageUri) {
      Alert.alert(
        'Descartar publicação?',
        'As alterações feitas não serão salvas.',
        [
          { text: 'Continuar editando', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: () => goBack() },
        ]
      );
    } else {
      goBack();
    }
  };

  const handleAddImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos para publicar uma imagem.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Erro ao escolher imagem:', err);
      Alert.alert('Erro', 'Não foi possível acessar a galeria de fotos.');
    }
  };

  const handleAddLocation = () => {
    Alert.alert('Adicionar Localização', 'Escolha sua localização:', [
      { text: 'São Paulo, SP', onPress: () => setLocation('São Paulo, SP') },
      { text: 'Rio de Janeiro, RJ', onPress: () => setLocation('Rio de Janeiro, RJ') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleAddFeeling = () => {
    Alert.alert('Como você está se sentindo?', 'Escolha um sentimento:', [
      { text: '😄 Feliz', onPress: () => setFeeling('Feliz') },
      { text: '✨ Inspirado(a)', onPress: () => setFeeling('Inspirado(a)') },
      { text: '🚀 Animado(a)', onPress: () => setFeeling('Animado(a)') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handlePublish = () => {
    if (!text.trim() && !imageUri) {
      Alert.alert('Atenção', 'Escreva algo ou selecione uma imagem para publicar!');
      return;
    }

    addFeedPost(text.trim() || 'Nova foto compartilhada', imageUri);
    Alert.alert('Sucesso!', 'Sua publicação foi compartilhada no feed!', [
      {
        text: 'OK',
        onPress: () => navigate('Feed'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE9E8" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={28} color="#DC586D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Publicação</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card Principal */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>O que você está pensando?</Text>

            {/* Caixa de Texto */}
            <TextInput
              style={styles.textArea}
              placeholder="Escreva algo..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={text}
              onChangeText={setText}
            />

            {/* Pré-visualização da imagem escolhida da galeria */}
            {imageUri && (
              <View style={styles.imagePreviewWrapper}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => setImageUri(null)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close-circle" size={26} color="#DF5268" />
                </TouchableOpacity>
              </View>
            )}

            {/* Badges de Imagem/Local/Sentimento selecionados */}
            {(imageUri || location || feeling) && (
              <View style={styles.selectedTagsContainer}>
                {imageUri && (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() => setImageUri(null)}
                  >
                    <Text style={styles.tagText}>📷 Foto selecionada ✕</Text>
                  </TouchableOpacity>
                )}
                {location && (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() => setLocation(null)}
                  >
                    <Text style={styles.tagText}>📍 {location} ✕</Text>
                  </TouchableOpacity>
                )}
                {feeling && (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() => setFeeling(null)}
                  >
                    <Text style={styles.tagText}>✨ {feeling} ✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Barra de Ações: Imagem, Localização, Sentimento */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleAddImage}
                activeOpacity={0.7}
              >
                <Ionicons name="image-outline" size={18} color="#DC586D" />
                <Text style={styles.optionText}>Imagem</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleAddLocation}
                activeOpacity={0.7}
              >
                <Ionicons name="location-outline" size={18} color="#DC586D" />
                <Text style={styles.optionText}>Localização</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleAddFeeling}
                activeOpacity={0.7}
              >
                <Ionicons name="happy-outline" size={18} color="#DC586D" />
                <Text style={styles.optionText}>Sentimento</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão Publicar */}
          <TouchableOpacity
            style={styles.publishButton}
            onPress={handlePublish}
            activeOpacity={0.85}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Barra de Navegação Inferior */}
        <BottomNavBar activeTab="criar" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE9E8',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8A8B5',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  textArea: {
    height: 180,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 12,
    fontSize: 14,
    color: '#111111',
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  imagePreviewWrapper: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 12,
    position: 'relative',
    backgroundColor: '#FFE8EC',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FFE8EC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8A8B5',
  },
  tagText: {
    fontSize: 11,
    color: '#A33757',
    fontWeight: '600',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  optionText: {
    fontSize: 12,
    color: '#DC586D',
    fontWeight: '600',
  },
  publishButton: {
    width: '65%',
    maxWidth: 240,
    height: 48,
    backgroundColor: '#DC586D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
