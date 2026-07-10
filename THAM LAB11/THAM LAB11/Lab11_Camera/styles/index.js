import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    color: '#ffcc00',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1b263b',
    borderWidth: 2,
    borderColor: '#415a77',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#1b263b',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#415a77',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    padding: 30,
  },
  placeholderText: {
    fontSize: 24,
    color: '#ccc',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#888',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#1b263b',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#415a77',
  },
  infoTitle: {
    fontSize: 20,
    color: '#00b4d8',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#caf0f8',
    marginBottom: 5,
  },
  galleryButton: {
    backgroundColor: '#FF9800',
},
});