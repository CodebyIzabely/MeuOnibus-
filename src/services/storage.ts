import AsyncStorage from '@react-native-async-storage/async-storage';

export type Favorito = {
  id: number;                 // cl (linha) ou cp (parada)
  tipo: 'linha' | 'parada';
  nome: string;               // texto mostrado na lista
  detalhe?: string;           // sentido da linha ou endereço da parada
  dados: any;                 // objeto completo, para abrir a tela de detalhe
};

const KEY_FAV = '@meuonibus:favoritos';
const KEY_HIST = '@meuonibus:historico';

export async function getFavoritos(): Promise<Favorito[]> {
  return JSON.parse((await AsyncStorage.getItem(KEY_FAV)) || '[]');
}

export async function isFavorito(id: number, tipo: Favorito['tipo']): Promise<boolean> {
  const favs = await getFavoritos();
  return favs.some(f => f.id === id && f.tipo === tipo);
}

export async function toggleFavorito(item: Favorito): Promise<boolean> {
  const favs = await getFavoritos();
  const existe = favs.some(f => f.id === item.id && f.tipo === item.tipo);
  const novos = existe
    ? favs.filter(f => !(f.id === item.id && f.tipo === item.tipo))
    : [...favs, item];
  await AsyncStorage.setItem(KEY_FAV, JSON.stringify(novos));
  return !existe; // true = agora é favorito
}

export async function addHistorico(termo: string): Promise<void> {
  const h: string[] = JSON.parse((await AsyncStorage.getItem(KEY_HIST)) || '[]');
  const novo = [termo, ...h.filter(t => t !== termo)].slice(0, 8);
  await AsyncStorage.setItem(KEY_HIST, JSON.stringify(novo));
}

export async function getHistorico(): Promise<string[]> {
  return JSON.parse((await AsyncStorage.getItem(KEY_HIST)) || '[]');
}

export async function limparHistorico(): Promise<void> {
  await AsyncStorage.removeItem(KEY_HIST);
}