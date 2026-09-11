import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { BottomNavBar } from '../components/BottomNavBar';

interface EditProfileScreenProps {
  onBack?: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('Leonardo Oliveira');
  const [username, setUsername] = useState('leo_00');
  const [bio, setBio] = useState('Oii, bem vindos ao meu Perfil');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('perfil');

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos e alterar a imagem de perfil.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a imagem selecionada.');
    }
  };

  const handleSave = () => {
    Alert.alert(
      'Sucesso',
      `Perfil atualizado!\n\nNome: ${name}\nUsuário: ${username}\nBio: ${bio}`
    );
  };

  return (
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onBack || (() => Alert.alert('Voltar', 'Ação de voltar pressionada'))}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Feather name="chevron-left" size={32} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Editar Perfil</Text>
            {/* Espaçador para centralizar o título perfeitamente */}
            <View style={styles.headerRightSpacer} />
          </View>

          {/* Avatar com Borda Rosa e Badge de Câmera */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.85}
              style={styles.avatarCircle}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}

              {/* Botão / Ícone da Câmera com + */}
              <View style={styles.cameraBadge}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={18}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            {/* Campo: Nome */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            {/* Campo: Usuario */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Nome de usuário"
                placeholderTextColor="#9E9E9E"
                autoCapitalize="none"
              />
            </View>

            {/* Campo: Bio */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Conte um pouco sobre você..."
                placeholderTextColor="#9E9E9E"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Botão de Ação: Salvar Alterações */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.85}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Barra de Navegação Inferior */}
      <BottomNavBar
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
        onPlusPress={() => Alert.alert('Novo', 'Criar nova postagem')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  headerRightSpacer: {
    width: 40,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.cardBackground,
    borderWidth: 3,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 67,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 67,
    backgroundColor: colors.white,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  formContainer: {
    paddingHorizontal: 28,
    marginTop: 10,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textSecondary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  bioInput: {
    height: 95,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
