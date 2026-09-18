import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundFeed,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  linhaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeLogo: {
    width: 48,
    height: 48,
    marginRight: -4,
  },
  textoLogo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  botaoPesquisa: {
    padding: 6,
  },
  listaFeed: {
    flex: 1,
  },
  conteudoFeed: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  cartaoPublicacao: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cabecalhoPublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  marcadorAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.badgePink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  nomeUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  conteudoCabecalhoPost: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  linhaLocalizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  textoLocalizacao: {
    fontSize: 11,
    color: colors.primaryVariant,
    fontWeight: '600',
  },
  textoPublicacao: {
    fontSize: 15,
    lineHeight: 21,
    color: '#1A0E13',
    marginBottom: 14,
  },
  rodapePublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  acoesEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contadorAcao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textDark,
    marginLeft: 6,
  },
  imagemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  embrulhoImagemPost: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: colors.badgePink,
  },
  imagemPost: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
