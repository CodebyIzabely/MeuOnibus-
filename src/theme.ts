import { StyleSheet } from 'react-native';

export const cores = {
  primaria: '#C8102E',
  fundo: '#F4F4F6',
  card: '#FFFFFF',
  texto: '#1C1C1E',
  textoSuave: '#6B6B73',
  borda: '#E2E2E6',
  verde: '#1E8E3E',
};

export const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16 },
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  titulo: { fontSize: 18, fontWeight: '700', color: cores.texto },
  subtitulo: { fontSize: 14, color: cores.textoSuave, marginTop: 2 },
  input: {
    flex: 1,
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: cores.texto,
  },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  vazio: { textAlign: 'center', color: cores.textoSuave, marginTop: 30, fontSize: 15 },
  secao: { fontSize: 14, fontWeight: '700', color: cores.textoSuave, marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
});