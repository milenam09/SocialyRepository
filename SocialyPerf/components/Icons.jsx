import React from 'react';
import { View, StyleSheet } from 'react-native';

// Try loading @expo/vector-icons if installed
let Ionicons = null;
let MaterialCommunityIcons = null;
let Feather = null;

try {
  const vectorIcons = require('@expo/vector-icons');
  Ionicons = vectorIcons.Ionicons;
  MaterialCommunityIcons = vectorIcons.MaterialCommunityIcons;
  Feather = vectorIcons.Feather;
} catch (e) {
  // Vector icons not installed or running in pure environment
}

/**
 * Chevron Voltar (<)
 */
export function ChevronLeft({ size = 26, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="chevron-back" size={size} color={color} />;
  }
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          width: size * 0.46,
          height: size * 0.46,
          borderLeftWidth: 2.5,
          borderBottomWidth: 2.5,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: size * 0.2,
        }}
      />
    </View>
  );
}

/**
 * Engrenagem de Configurações (⚙)
 */
export function GearSettings({ size = 26, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="settings-sharp" size={size} color={color} />;
  }
  // Shape nativo com 8 dentes e furo central
  const cogWidth = size * 0.26;
  const cogHeight = size * 0.95;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* 4 barras rotacionadas para criar os 8 dentes */}
      <View style={[styles.cogBar, { width: cogWidth, height: cogHeight, backgroundColor: color }]} />
      <View style={[styles.cogBar, { width: cogWidth, height: cogHeight, backgroundColor: color, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.cogBar, { width: cogWidth, height: cogHeight, backgroundColor: color, transform: [{ rotate: '90deg' }] }]} />
      <View style={[styles.cogBar, { width: cogWidth, height: cogHeight, backgroundColor: color, transform: [{ rotate: '135deg' }] }]} />
      {/* Corpo circular do meio */}
      <View
        style={{
          position: 'absolute',
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size * 0.36,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Furo central da engrenagem */}
        <View
          style={{
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: size * 0.15,
            backgroundColor: '#FFE9E8',
          }}
        />
      </View>
    </View>
  );
}

/**
 * Câmera com sinal de (+) no avatar
 */
export function CameraBadge({ size = 24, color = '#A33757' }) {
  if (MaterialCommunityIcons) {
    return <MaterialCommunityIcons name="camera-plus" size={size} color={color} />;
  }
  // Shape nativo da câmera com o (+)
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      {/* Top flash bump */}
      <View
        style={{
          width: size * 0.4,
          height: size * 0.16,
          backgroundColor: color,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          alignSelf: 'center',
          marginBottom: -1,
        }}
      />
      {/* Corpo da câmera */}
      <View
        style={{
          width: size * 0.9,
          height: size * 0.65,
          backgroundColor: color,
          borderRadius: 3.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Lente da câmera */}
        <View
          style={{
            width: size * 0.32,
            height: size * 0.32,
            borderRadius: size * 0.16,
            borderWidth: 1.5,
            borderColor: '#FFFFFF',
            backgroundColor: 'transparent',
          }}
        />
      </View>
      {/* Mini (+) no canto superior */}
      <View
        style={{
          position: 'absolute',
          right: -1,
          top: 0,
          width: 8,
          height: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 7, height: 1.8, backgroundColor: color }} />
        <View style={{ position: 'absolute', width: 1.8, height: 7, backgroundColor: color }} />
      </View>
    </View>
  );
}

/**
 * Aba Grid (Grade 3x3)
 */
export function GridTabIcon({ size = 24, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="grid" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, justifyContent: 'space-between', padding: 2 }}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[0, 1, 2].map((col) => (
            <View
              key={col}
              style={{
                width: size * 0.23,
                height: size * 0.23,
                backgroundColor: color,
                borderRadius: 1,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * Aba Lista (3 Barras horizontais)
 */
export function ListTabIcon({ size = 24, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="menu" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, justifyContent: 'space-around', alignItems: 'center', paddingVertical: 3 }}>
      <View style={{ width: size * 0.9, height: 2.8, backgroundColor: color, borderRadius: 1.5 }} />
      <View style={{ width: size * 0.9, height: 2.8, backgroundColor: color, borderRadius: 1.5 }} />
      <View style={{ width: size * 0.9, height: 2.8, backgroundColor: color, borderRadius: 1.5 }} />
    </View>
  );
}

/**
 * Aba Salvos (Marcador/Bookmark)
 */
export function BookmarkTabIcon({ size = 24, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="bookmark-outline" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size * 0.65,
          height: size * 0.85,
          borderWidth: 2.2,
          borderColor: color,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          backgroundColor: 'transparent',
          position: 'relative',
        }}
      >
        {/* Notch inferior no formato V */}
        <View
          style={{
            position: 'absolute',
            bottom: -3,
            left: '50%',
            marginLeft: -5,
            width: 0,
            height: 0,
            borderLeftWidth: 5,
            borderRightWidth: 5,
            borderBottomWidth: 5,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#FFE9E8',
          }}
        />
      </View>
    </View>
  );
}

/**
 * Ícone Início (Casa)
 */
export function HomeIcon({ size = 24, color = '#1A1A1A' }) {
  if (Ionicons) {
    return <Ionicons name="home-outline" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Telhado */}
      <View
        style={{
          width: size * 0.52,
          height: size * 0.52,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginTop: 2,
        }}
      />
      {/* Paredes */}
      <View
        style={{
          width: size * 0.6,
          height: size * 0.45,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          marginTop: -size * 0.2,
        }}
      />
    </View>
  );
}

/**
 * Ícone Buscar (Lupa)
 */
export function SearchIcon({ size = 24, color = '#1A1A1A' }) {
  if (Ionicons) {
    return <Ionicons name="search-outline" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Círculo da lupa */}
      <View
        style={{
          width: size * 0.58,
          height: size * 0.58,
          borderRadius: size * 0.29,
          borderWidth: 2.2,
          borderColor: color,
          marginTop: -2,
          marginLeft: -3,
        }}
      />
      {/* Cabo inclinado */}
      <View
        style={{
          position: 'absolute',
          bottom: 2,
          right: 3,
          width: 2.2,
          height: size * 0.35,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }],
          borderRadius: 1,
        }}
      />
    </View>
  );
}

/**
 * Ícone Notificações (Sino)
 */
export function NotificationsIcon({ size = 24, color = '#1A1A1A' }) {
  if (Ionicons) {
    return <Ionicons name="notifications-outline" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Sino */}
      <View
        style={{
          width: size * 0.65,
          height: size * 0.6,
          borderWidth: 2,
          borderColor: color,
          borderTopLeftRadius: size * 0.35,
          borderTopRightRadius: size * 0.35,
          borderBottomWidth: 0,
        }}
      />
      {/* Base do sino */}
      <View
        style={{
          width: size * 0.8,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Badalo inferior */}
      <View
        style={{
          width: 4,
          height: 3,
          backgroundColor: color,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      />
    </View>
  );
}

/**
 * Ícone Perfil Ativo (Usuário preenchido)
 */
export function ProfileIcon({ size = 24, color = '#A33757' }) {
  if (Ionicons) {
    return <Ionicons name="person" size={size} color={color} />;
  }
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Cabeça */}
      <View
        style={{
          width: size * 0.42,
          height: size * 0.42,
          borderRadius: size * 0.21,
          backgroundColor: color,
          marginBottom: 2,
        }}
      />
      {/* Corpo / Ombros */}
      <View
        style={{
          width: size * 0.72,
          height: size * 0.36,
          borderTopLeftRadius: size * 0.36,
          borderTopRightRadius: size * 0.36,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cogBar: {
    position: 'absolute',
    borderRadius: 3,
  },
});
