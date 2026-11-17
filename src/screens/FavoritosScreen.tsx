import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TelaProps } from '../navigation';
import { estilos, cores } from '../theme';
import { Favorito, getFavoritos, toggleFavorito } from '../services/storage';

export default function FavoritosScreen({ navigation }: TelaProps<'Favoritos'>) {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  // Recarrega do AsyncStorage toda vez que a tela aparece
  useFocusEffect(
    useCallback(() => {
      getFavoritos().then(setFavoritos);
    }, [])
  );

  const abrir = (f: Favorito) => {
    if (f.tipo === 'linha') navigation.navigate('LinhaDetalhe', { linha: f.dados });
    else navigation.navigate('Previsao', { parada: f.dados });
  };

  const remover = (f: Favorito) => {
    Alert.alert('Remover favorito', `Remover "${f.nome}" dos favoritos?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await toggleFavorito(f);
          setFavoritos(await getFavoritos());
        },
      },
    ]);
  };

  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <FlatList
        data={favoritos}
        keyExtractor={f => `${f.tipo}-${f.id}`}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Você ainda não tem favoritos.{'\n'}Toque na ☆ de uma linha ou parada para salvar aqui.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[estilos.card, { flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => abrir(item)}
            onLongPress={() => remover(item)}
          >
            <Text style={{ fontSize: 26, marginRight: 12 }}>{item.tipo === 'linha' ? '🚌' : '🚏'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[estilos.titulo, item.tipo === 'linha' && { color: cores.primaria }]}>{item.nome}</Text>
              {!!item.detalhe && <Text style={estilos.subtitulo}>{item.detalhe}</Text>}
            </View>
            <TouchableOpacity onPress={() => remover(item)}>
              <Text style={{ fontSize: 20, color: cores.textoSuave }}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}