// src/styles/index.js
import { StyleSheet } from 'react-native';

export const colors = {
  darkBg: '#1a1a2e',
  cardBg: '#16213e',
  primary: '#0f3460',
  accent: '#e94560',
  text: '#ffffff',
  textSecondary: '#b8b8b8'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: colors.accent,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(233, 69, 96, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoTitle: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  input: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: colors.text,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a3c5e',
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentBox: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  commentText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});