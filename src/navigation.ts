import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Linha, Parada } from './services/api';

// Lista de telas do app e o que cada uma recebe
export type RootStackParamList = {
  Home: undefined;
  Linhas: undefined;
  LinhaDetalhe: { linha: Linha };
  Paradas: undefined;
  Previsao: { parada: Parada };
  Favoritos: undefined;
};

export type TelaProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;