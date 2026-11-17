import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TelaProps } from '../navigation';
import { estilos, cores } from '../theme';
import { previsaoParada, PrevisaoLinha } from '../services/api';
import { isFavorito, toggleFavorito } from '../services/storage';

// Converte "HH:MM" em "em X min"
function minutosAte(hora?: string): string {
  if (!hora) return '';
  const [h, m] = hora.split(':').map(Number);
  const agora = new Date();
  let diff = h * 60 + m - (agora.getHours() * 60 + agora.getMinutes());
  if (diff < -720) diff += 1440; // passou da meia-noite
  if (diff <= 0) return 'chegando';
  return `em ${diff} min`;
}

export default function PrevisaoScreen({ route, navigation }: TelaProps<'Previsao'>) {
  const { parada } = route.params;
  const [linhas, setLinhas] = useState<PrevisaoLinha[]>([]);
  const [hora, setHora] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [favorito, setFavorito] = useState(false);

  // Estrela de favorito no cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={alternarFavorito}>
          <Text style={{ fontSize: 24, color: '#fff' }}>{favorito ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [favorito]);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const prev = await previsaoParada(parada.cp);
      setLinhas(prev?.p?.l ?? []);
      setHora(prev?.hr ?? '');
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível carregar a previsão.\n' + e.message);
    } finally {
      setCarregando(false);
    }
  }, [parada.cp]);

  useEffect(() => {
    isFavorito(parada.cp, 'parada').then(setFavorito);
    carregar();
    // Atualiza sozinho a cada 30 segundos
    const timer = setInterval(carregar, 30000);
    return () => clearInterval(timer);
  }, [carregar]);

  // Salva/remove a parada dos favoritos (AsyncStorage)
  const alternarFavorito = async () => {
    const agora = await toggleFavorito({
      id: parada.cp,
      tipo: 'parada',
      nome: parada.np,
      detalhe: parada.ed,
      dados: parada,
    });
    setFavorito(agora);
  };

  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <View style={estilos.card}>
        <Text style={estilos.titulo}>🚏 {parada.np}</Text>
        {!!parada.ed && <Text style={estilos.subtitulo}>{parada.ed}</Text>}
        {!!hora && <Text style={[estilos.subtitulo, { marginTop: 6 }]}>Atualizado às {hora} · atualiza a cada 30s</Text>}
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 10 }}>
          <TouchableOpacity onPress={carregar}>
            <Text style={{ color: cores.primaria, fontWeight: '700' }}>⟳ Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={alternarFavorito}>
            <Text style={{ color: cores.primaria, fontWeight: '700' }}>
              {favorito ? '★ Remover dos favoritos' : '☆ Favoritar parada'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={estilos.secao}>Próximos ônibus</Text>

      {carregando && linhas.length === 0 ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={linhas}
          keyExtractor={item => `${item.cl}`}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhum ônibus previsto para esta parada agora.</Text>}
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <Text style={[estilos.titulo, { color: cores.primaria }]}>{item.c}</Text>
              <Text style={estilos.subtitulo}>Destino: {item.lt0}</Text>
              {item.vs.map(v => (
                <View key={v.p} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <Text style={{ color: cores.texto }}>
                    🚌 Ônibus {v.p} {v.a ? '♿' : ''}
                  </Text>
                  <Text style={{ color: cores.verde, fontWeight: '700' }}>
                    {v.t} ({minutosAte(v.t)})
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}