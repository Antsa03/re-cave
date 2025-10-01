/**
 * Palette de couleurs de l'application Cave Ray
 */

export const Colors = {
  // Couleurs principales
  primary: "#8B5CF6", // Violet
  secondary: "#EC4899", // Rose
  accent: "#F59E0B", // Orange

  // Texte
  textDark: "#111827", // Texte principal
  textGray: "#6B7280", // Texte secondaire
  textLight: "#9CA3AF", // Texte désactivé

  // Fond
  background: "#F9FAFB", // Fond principal
  white: "#FFFFFF", // Blanc

  // Bordures
  border: "#E5E7EB", // Bordure normale
  borderLight: "#F3F4F6", // Bordure claire

  // États
  success: "#10B981", // Vert succès
  error: "#EF4444", // Rouge erreur
  warning: "#F59E0B", // Orange warning
  info: "#3B82F6", // Bleu info

  // Overlays
  overlay: "rgba(0, 0, 0, 0.5)",

  // Couleurs spécifiques
  purple: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    500: "#8B5CF6",
    600: "#7C3AED",
    900: "#581C87",
  },

  pink: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    500: "#EC4899",
    600: "#DB2777",
  },

  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

/**
 * Ombres
 */
export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  large: {
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};

/**
 * Espacements
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * Rayons de bordure
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

/**
 * Tailles de police
 */
export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 32,
};
