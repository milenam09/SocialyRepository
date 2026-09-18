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
  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  cartao: {
    width: '94%',
    maxWidth: 380,
    backgroundColor: colors.cardBackground,
    borderWidth: 1.2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 26,
  },
  formulario: {
    width: '100%',
    gap: 24,
  },
  campo: {
    width: '100%',
  },
  rotulo: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  campoTexto: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 5,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 10,
    fontSize: 12,
    color: colors.textPrimary,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {}),
  },
  botaoCadastrar: {
    width: '58%',
    maxWidth: 240,
    height: 48,
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  textoBotaoCadastrar: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rodapeLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  textoJaTemConta: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  linkEntrar: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default styles;
