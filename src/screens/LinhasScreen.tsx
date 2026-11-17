import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TelaProps } from '../navigation';
import { estilos, cores } from '../theme';
import { buscarLinhas, Linha, letreiro, sentido } from '../services/api';
import { addHistorico, getHistorico } from '../services/storage';
import CampoBusca from '../components/CampoBusca';

export default function LinhasScreen({ navigation }: TelaProps<'Linhas'>) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);
  const [historico, setHistorico] = useState<string[]>([]);

  // Carrega o histórico salvo no AsyncStorage sempre que a tela aparece
  useFocusEffect(
    useCallback(() => {
      getHistorico().then(setHistorico);
    }, [])
  );

  const buscar = async (termo: string) => {
    setCarregando(true);
    setBuscou(true);
    try {
      const resultado = await buscarLinhas(termo);
      setLinhas(resultado);
      await addHistorico(termo);
      setHistorico(await getHistorico());
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível buscar as linhas.\n' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <CampoBusca placeholder="Número ou destino (ex: 8000)" onBuscar={buscar} />

      {!buscou && historico.length > 0 && (
        <View>
          <Text style={estilos.secao}>Buscas recentes</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {historico.map(h => (
              <TouchableOpacity key={h} onPress={() => buscar(h)} style={{ backgroundColor: cores.card, borderWidth: 1, borderColor: cores.borda, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 }}>
                <Text style={{ color: cores.texto }}>{h}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {carregando ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={linhas}
          keyExtractor={item => String(item.cl)}
          ListEmptyComponent={buscou ? <Text style={estilos.vazio}>Nenhuma linha encontrada.</Text> : undefined}
          renderItem={({ item }) => (
            <TouchableOpacity style={estilos.card} onPress={() => navigation.navigate('LinhaDetalhe', { linha: item })}>
              <Text style={[estilos.titulo, { color: cores.primaria }]}>{letreiro(item)}</Text>
              <Text style={estilos.subtitulo}>{sentido(item)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}