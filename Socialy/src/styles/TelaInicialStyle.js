import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
  },
  secaoSuperior: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    height: 200,
  },
  imagemLogo: {
    width: '100%',
    height: '100%',
  },
  containerMensagem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  textoFraseEfeito: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  secaoBotoes: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  botao: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  botaoPrimario: {
    backgroundColor: colors.primaryVariant,
  },
  textoBotaoPrimario: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  botaoSecundario: {
    backgroundColor: colors.white,
  },
  textoBotaoSecundario: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default styles;
