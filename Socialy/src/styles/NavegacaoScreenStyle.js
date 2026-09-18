import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  rolagemTela: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  containerSubtitulo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textoSubtitulo: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  containerCartoes: {
    width: '100%',
    gap: 12,
  },
  cartaoNavegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  containerIcone: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  containerTextoCartao: {
    flex: 1,
  },
  tituloCartao: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  descricaoCartao: {
    fontSize: 12,
    color: colors.textGrey,
  },
});

export default styles;
