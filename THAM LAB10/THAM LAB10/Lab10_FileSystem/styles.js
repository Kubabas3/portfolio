import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0d1b2a',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonWrapper: {
    width: '45%',
    margin: 5,
  },
  downloadButton: {
    width: '92%',
  },
  weaponBox: {
    width: '100%',
    backgroundColor: '#1b3a4b',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00b4d8',
    marginBottom: 20,
    alignItems: 'center',
  },
  weaponTitle: {
    fontSize: 20,
    color: '#00b4d8',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weaponText: {
    fontSize: 16,
    color: '#caf0f8',
    marginBottom: 5,
  },
  weaponImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentBox: {
    width: '100%',
    backgroundColor: '#1b263b',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#415a77',
  },
  contentTitle: {
    fontSize: 18,
    color: '#ffcc00',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 12,
    color: '#e0e0e0',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});