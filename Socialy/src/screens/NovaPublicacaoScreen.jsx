import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '../context/NavigationContext';
import BottomNavBar from '../components/BottomNavBar';
import { colors } from '../theme/colors';
import styles from '../styles/NovaPublicacaoScreenStyle';

// =========================================================================
// AQUI FICA A TELA DE NOVA PUBLICAÇÃO (ONDE O USUÁRIO CRIA E ENVIA O POST)
// =========================================================================
export default function NovaPublicacaoScreen() {
  const { goBack, navigate, addFeedPost } = useNavigation();

  // //aqui ficam os dados da publicação (texto, foto, gps e sentimento)
  const [texto, setTexto] = useState('');
  const [uriImagem, setUriImagem] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [coordenadas, setCoordenadas] = useState(null);
  const [sentimento, setSentimento] = useState(null);
  const [gpsAutomaticoNaFoto, setGpsAutomaticoNaFoto] = useState(true);
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);

  const fecharTela = () => {
    if (texto.trim() || uriImagem) {
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

  const obterLocalizacaoGps = async (silencioso = false) => {
    setCarregandoLocalizacao(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCarregandoLocalizacao(false);
        if (!silencioso) {
          Alert.alert(
            'Permissão de Localização',
            'O Socialy precisa de permissão de localização (GPS / latitude e longitude) para identificar onde sua foto foi tirada.'
          );
        }
        return null;
      }

      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coordenadasAtuais = {
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      };
      setCoordenadas(coordenadasAtuais);

      let nomeLugar = '';
      try {
        const resultadoReverso = await Location.reverseGeocodeAsync({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
        });

        if (resultadoReverso && resultadoReverso.length > 0) {
          const item = resultadoReverso[0];
          const cidade = item.city || item.subregion || item.district || item.name;
          const estado = item.region || item.country;
          nomeLugar = cidade ? (estado ? `${cidade}, ${estado}` : cidade) : 'Localização Atual';
        }
      } catch (erroGeo) {
        console.warn('Erro ao obter nome do endereço:', erroGeo);
      }

      if (!nomeLugar) {
        nomeLugar = 'Localização Atual';
      }

      setLocalizacao(nomeLugar);
      setCarregandoLocalizacao(false);
      return { nomeLugar, coordenadas: coordenadasAtuais };
    } catch (erro) {
      console.error('Erro ao acessar GPS:', erro);
      setCarregandoLocalizacao(false);
      if (!silencioso) {
        Alert.alert(
          'GPS indisponível',
          'Não foi possível obter sua localização atual via GPS. Verifique se o GPS está ativado.'
        );
      }
      return null;
    }
  };

  const tirarFotoCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão da Câmera necessária',
          'Precisamos de permissão para usar sua câmera e tirar fotos diretamente para a publicação.'
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
        base64: true,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const arquivo = resultado.assets[0];
        const uriPersistente =
          Platform.OS === 'web' && arquivo.base64
            ? `data:image/jpeg;base64,${arquivo.base64}`
            : arquivo.uri;
        setUriImagem(uriPersistente);

        if (gpsAutomaticoNaFoto && !localizacao) {
          obterLocalizacaoGps(true);
        }
      }
    } catch (erro) {
      console.error('Erro ao abrir câmera:', erro);
      Alert.alert('Erro na Câmera', 'Não foi possível inicializar a câmera do dispositivo.');
    }
  };

  const escolherFotoGaleria = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos para publicar uma imagem.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
        base64: true,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const arquivo = resultado.assets[0];
        const uriPersistente =
          Platform.OS === 'web' && arquivo.base64
            ? `data:image/jpeg;base64,${arquivo.base64}`
            : arquivo.uri;
        setUriImagem(uriPersistente);

        if (gpsAutomaticoNaFoto && !localizacao) {
          obterLocalizacaoGps(true);
        }
      }
    } catch (erro) {
      console.error('Erro ao escolher imagem:', erro);
      Alert.alert('Erro', 'Não foi possível acessar a galeria de fotos.');
    }
  };

  const definirLocalizacao = () => {
    Alert.alert(
      'Adicionar Localização',
      'Como deseja definir a localização da publicação?',
      [
        {
          text: '📍 Usar minha localização atual (GPS)',
          onPress: () => obterLocalizacaoGps(false),
        },
        {
          text: 'São Paulo, SP',
          onPress: () => {
            setLocalizacao('São Paulo, SP');
            setCoordenadas({ latitude: -23.5505, longitude: -46.6333 });
          },
        },
        {
          text: 'Rio de Janeiro, RJ',
          onPress: () => {
            setLocalizacao('Rio de Janeiro, RJ');
            setCoordenadas({ latitude: -22.9068, longitude: -43.1729 });
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const selecionarSentimento = () => {
    Alert.alert('Como você está se sentindo?', 'Escolha um sentimento:', [
      { text: '😄 Feliz', onPress: () => setSentimento('Feliz') },
      { text: '✨ Inspirado(a)', onPress: () => setSentimento('Inspirado(a)') },
      { text: '🚀 Animado(a)', onPress: () => setSentimento('Animado(a)') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  // =========================================================================
  // //aqui fica onde manda a publicação (função que processa e dispara o envio)
  // =========================================================================
  const publicarPost = async () => {
    if (!texto.trim() && !uriImagem) {
      Alert.alert('Atenção', 'Escreva algo ou tire/selecione uma foto para publicar!');
      return;
    }

    let localizacaoFinal = localizacao;
    let coordenadasFinais = coordenadas;

    if (uriImagem && gpsAutomaticoNaFoto && (!localizacaoFinal || !coordenadasFinais)) {
      const resultadoGps = await obterLocalizacaoGps(true);
      if (resultadoGps) {
        localizacaoFinal = resultadoGps.nomeLugar || localizacaoFinal;
        coordenadasFinais = resultadoGps.coordenadas || coordenadasFinais;
      }
    }

    // //aqui fica onde manda a publicação de fato (chama a ação do Feed / API)
    addFeedPost(texto.trim() || 'Nova foto compartilhada', uriImagem, localizacaoFinal, coordenadasFinais);
    Alert.alert('Sucesso!', 'Sua publicação foi compartilhada no feed!', [
      {
        text: 'OK',
        onPress: () => navigate('Feed'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={fecharTela}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.botaoFechar}
          >
            <Ionicons name="close" size={28} color={colors.primaryVariant} />
          </TouchableOpacity>
          <Text style={styles.tituloCabecalho}>Nova Publicação</Text>
          <View style={styles.espacadorCabecalho} />
        </View>

        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ========================================================================= */}
          {/* //aqui fica onde monta a publicação (campo de texto, foto e opções) */}
          {/* ========================================================================= */}
          <View style={styles.cartao}>
            <Text style={styles.tituloCartao}>O que você está pensando?</Text>

            <TextInput
              style={styles.campoTextoArea}
              placeholder="Escreva algo..."
              placeholderTextColor={colors.placeholderGray}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={texto}
              onChangeText={setTexto}
            />

            {uriImagem && (
              <View style={styles.previaImagemWrapper}>
                <Image source={{ uri: uriImagem }} style={styles.previaImagem} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.botaoRemoverImagem}
                  onPress={() => setUriImagem(null)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close-circle" size={26} color={colors.primary} />
                </TouchableOpacity>
              </View>
            )}

            {(uriImagem || localizacao || sentimento || carregandoLocalizacao) && (
              <View style={styles.containerEtiquetasSelecionadas}>
                {uriImagem && (
                  <TouchableOpacity
                    style={styles.etiqueta}
                    onPress={() => setUriImagem(null)}
                  >
                    <Text style={styles.textoEtiqueta}>📷 Foto selecionada ✕</Text>
                  </TouchableOpacity>
                )}
                {carregandoLocalizacao && (
                  <View style={styles.etiquetaCarregando}>
                    <ActivityIndicator size="small" color={colors.primaryVariant} />
                    <Text style={styles.textoEtiquetaCarregando}>Obtendo localização via GPS...</Text>
                  </View>
                )}
                {localizacao && !carregandoLocalizacao && (
                  <TouchableOpacity
                    style={styles.etiqueta}
                    onPress={() => {
                      setLocalizacao(null);
                      setCoordenadas(null);
                    }}
                  >
                    <Text style={styles.textoEtiqueta}>
                      📍 {localizacao} ✕
                    </Text>
                  </TouchableOpacity>
                )}
                {sentimento && (
                  <TouchableOpacity
                    style={styles.etiqueta}
                    onPress={() => setSentimento(null)}
                  >
                    <Text style={styles.textoEtiqueta}>✨ {sentimento} ✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.containerInterruptorGps}>
              <View style={styles.grupoTextoGps}>
                <Ionicons name="navigate-circle" size={22} color={colors.primaryVariant} />
                <View style={styles.conteudoTextoGps}>
                  <Text style={styles.tituloInterruptorGps}>GPS na Publicação</Text>
                  <Text style={styles.subtituloInterruptorGps}>
                    {gpsAutomaticoNaFoto
                      ? 'Ativado: Localiza ao tirar/escolher foto'
                      : 'Desativado: Não adiciona GPS'}
                  </Text>
                </View>
              </View>
              <Switch
                value={gpsAutomaticoNaFoto}
                onValueChange={(valor) => {
                  setGpsAutomaticoNaFoto(valor);
                  if (valor && !localizacao) {
                    obterLocalizacaoGps(true);
                  }
                }}
                trackColor={{ false: '#E0D0D4', true: '#FFA4B2' }}
                thumbColor={gpsAutomaticoNaFoto ? colors.primaryVariant : '#F4F3F4'}
              />
            </View>

            {/* Linha de Botões de Opções */}
            <View style={styles.linhaOpcoes}>
              <TouchableOpacity
                style={styles.itemOpcao}
                onPress={tirarFotoCamera}
                activeOpacity={0.7}
              >
                <Ionicons name="camera-outline" size={20} color={colors.primaryVariant} />
                <Text style={styles.textoOpcao}>Câmera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemOpcao}
                onPress={escolherFotoGaleria}
                activeOpacity={0.7}
              >
                <Ionicons name="image-outline" size={20} color={colors.primaryVariant} />
                <Text style={styles.textoOpcao}>Galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemOpcao}
                onPress={definirLocalizacao}
                activeOpacity={0.7}
              >
                <Ionicons name="location-outline" size={20} color={colors.primaryVariant} />
                <Text style={styles.textoOpcao}>GPS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemOpcao}
                onPress={selecionarSentimento}
                activeOpacity={0.7}
              >
                <Ionicons name="happy-outline" size={20} color={colors.primaryVariant} />
                <Text style={styles.textoOpcao}>Sentimento</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ========================================================================= */}
          {/* //aqui fica onde manda a publicação (botão que envia a publicação) */}
          {/* ========================================================================= */}
          <TouchableOpacity
            style={styles.botaoPublicar}
            onPress={publicarPost}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotaoPublicar}>Publicar</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Barra Inferior */}
        <BottomNavBar activeTab="criar" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
