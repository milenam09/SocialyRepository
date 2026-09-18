import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  itemAba: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 55,
  },
  rotuloAba: {
    fontSize: 11,
    color: colors.maroon,
    marginTop: 4,
    fontWeight: '500',
  },
  rotuloAbaAtiva: {
    color: colors.primaryBright,
    fontWeight: '700',
  },
  pontoAtivo: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryBright,
    marginTop: 3,
  },
  botaoCentral: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryBright,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryBright,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: colors.primaryBright,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeTexto: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default styles;
