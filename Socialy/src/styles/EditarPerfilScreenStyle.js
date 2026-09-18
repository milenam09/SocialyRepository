import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tecladoContainer: {
    flex: 1,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  botaoVoltar: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tituloCabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  espacadorCabecalho: {
    width: 36,
  },
  conteudoRolagem: {
    paddingTop: 10,
    paddingBottom: 24,
  },
  secaoAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  circuloAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  marcadorAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    backgroundColor: colors.white,
  },
  imagemAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  distintivoCamera: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1.5,
    borderColor: colors.primaryBright,
  },
  botaoAlterarFoto: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textoAlterarFoto: {
    fontSize: 13,
    color: colors.primaryBright,
    fontWeight: '700',
  },
  formularioContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  grupoCampo: {
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  campoTexto: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderInput,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  campoTextoBiografia: {
    height: 80,
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoSalvar: {
    backgroundColor: colors.primaryBright,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.primaryBright,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  textoBotaoSalvar: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoSairConta: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoSairConta: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
