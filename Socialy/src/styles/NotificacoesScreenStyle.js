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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  listaNotificacoes: {
    width: '100%',
    gap: 12,
  },
  cartaoNotificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconeContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.badgePink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  conteudoTexto: {
    flex: 1,
    justifyContent: 'center',
  },
  textoNotificacao: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    color: colors.primaryVariant,
  },
  textoHorario: {
    fontSize: 10,
    color: colors.primaryVariant,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default styles;
