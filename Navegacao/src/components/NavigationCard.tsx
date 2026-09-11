import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  FontAwesome5,
  Feather,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type CardIconType = 'home' | 'search' | 'create' | 'notifications' | 'profile';

interface NavigationCardProps {
  iconType: CardIconType;
  title: string;
  description: string;
  onPress?: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  iconType,
  title,
  description,
  onPress,
}: NavigationCardProps) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'home':
        return <FontAwesome5 name="home" size={26} color={colors.iconMaroon} />;
      case 'search':
        return <Feather name="search" size={28} color={colors.iconMaroon} />;
      case 'create':
        return <Ionicons name="add-circle" size={30} color={colors.iconMaroon} />;
      case 'notifications':
        return <Ionicons name="notifications-outline" size={28} color={colors.iconMaroon} />;
      case 'profile':
        return <FontAwesome name="user" size={27} color={colors.iconMaroon} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>{renderIcon()}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    // Sombra sutil suave
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  description: {
    fontSize: 13.5,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
