export const COLORS = {
  primary: '#E63946',
  secondary: '#2F855A',
  accent: '#F4A261',
  success: '#2F855A',
  warning: '#E9C46A',
  danger: '#E63946',
  light: '#F0FDF4',
  dark: '#1A202C',
  gray: '#6B7280',
  grayLight: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  green: '#2F855A',
  red: '#E63946',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  borderRadius: 12,
};

export const FONTS = {
  regular: { fontSize: 14 },
  medium: { fontSize: 16, fontWeight: '500' as const },
  bold: { fontSize: 16, fontWeight: '700' as const },
  title: { fontSize: 24, fontWeight: '700' as const },
  header: { fontSize: 20, fontWeight: '600' as const },
};

export const PRIORITY_LEVELS = {
  LOW: { label: 'Faible', color: '#2A9D8F', icon: '🟢' },
  MEDIUM: { label: 'Moyenne', color: '#E9C46A', icon: '🟡' },
  HIGH: { label: 'Élevée', color: '#F4A261', icon: '🟠' },
  CRITICAL: { label: 'Critique', color: '#E63946', icon: '🔴' },
};

export const REPORT_TYPES = [
  'Disparition',
  'Situation dangereuse',
  'Violence',
  'Menace',
  'Problème scolaire',
  'Exploitation',
  'Autre situation préoccupante',
];

export const REPORT_STATUSES = [
  'NOUVEAU',
  'EN_ANALYSE',
  'TRANSMIS',
  'EN_SUIVI',
  'RETROUVE',
  'CLOS',
];

export const USER_ROLES = [
  'ADMIN',
  'PARENT',
  'JEUNE',
  'ECOLE',
  'TRAVAILLEUR_SOCIAL',
  'ASSOCIATION',
];
