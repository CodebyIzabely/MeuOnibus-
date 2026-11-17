import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TelaProps } from '../navigation';
import { estilos, cores } from '../theme';
import { paradasDaLinha, posicaoLinha, Parada, letreiro, sentido } from '../services/api';
import { isFavorito, toggleFavorito } from '../services/storage';

export default function LinhaDetalheScreen({ route, navigation }: TelaProps<'LinhaDetalhe'>) {
  const { linha } = route.params;
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [qtdOnibus, setQtdOnibus] = useState<number | null>(null);
  const [atualizadoAs, setAtualizadoAs] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [favorito, setFavorito] = useState(false);

  // Título e estrela de favorito no cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      title: letreiro(linha),
      headerRight: () => (
        <TouchableOpacity onPress={alternarFavorito}>
          <Text style={{ fontSize: 24, color: '#fff' }}>{favorito ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [favorito]);

  useEffect(() => {
    isFavorito(linha.cl, 'linha').then(setFavorito);
    carregar();
  }, []);

  // Busca as paradas e a posição dos ônibus ao mesmo tempo
  const carregar = async () => {
    setCarregando(true);
    try {
      const [ps, pos] = await Promise.all([paradasDaLinha(linha.cl), posicaoLinha(linha.cl)]);
      setParadas(ps);
      setQtdOnibus(pos?.vs?.length ?? 0);
      setAtualizadoAs(pos?.hr ?? '');
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível carregar a linha.\n' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  // Salva/remove a linha dos favoritos (AsyncStorage)
  const alternarFavorito = async () => {
    const agora = await toggleFavorito({
      id: linha.cl,
      tipo: 'linha',
      nome: letreiro(linha),
      detalhe: sentido(linha),
      dados: linha,
    });
    setFavorito(agora);
  };

  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <View style={estilos.card}>
        <Text style={[estilos.titulo, { color: cores.primaria, fontSize: 22 }]}>{letreiro(linha)}</Text>
        <Text style={estilos.subtitulo}>{sentido(linha)}</Text>
        {qtdOnibus !== null && (
          <Text style={{ marginTop: 10, fontSize: 16, color: cores.verde, fontWeight: '700' }}>
            🚌 {qtdOnibus} ônibus circulando agora {atualizadoAs ? `(atualizado ${atualizadoAs})` : ''}
          </Text>
        )}
        <TouchableOpacity onPress={alternarFavorito} style={{ marginTop: 10 }}>
          <Text style={{ color: cores.primaria, fontWeight: '700' }}>
            {favorito ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={estilos.secao}>Paradas da linha</Text>

      {carregando ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={paradas}
          keyExtractor={item => String(item.cp)}
          onRefresh={carregar}
          refreshing={false}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma parada encontrada.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity style={estilos.card} onPress={() => navigation.navigate('Previsao', { parada: item })}>
              <Text style={estilos.titulo}>🚏 {item.np || 'Parada ' + item.cp}</Text>
              {!!item.ed && <Text style={estilos.subtitulo}>{item.ed}</Text>}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}