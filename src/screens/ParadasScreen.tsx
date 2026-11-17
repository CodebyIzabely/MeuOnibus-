import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TelaProps } from '../navigation';
import { estilos, cores } from '../theme';
import { buscarParadas, Parada } from '../services/api';
import { addHistorico } from '../services/storage';
import CampoBusca from '../components/CampoBusca';

export default function ParadasScreen({ navigation }: TelaProps<'Paradas'>) {
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const buscar = async (termo: string) => {
    setCarregando(true);
    setBuscou(true);
    try {
      setParadas(await buscarParadas(termo));
      await addHistorico(termo);
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível buscar as paradas.\n' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <CampoBusca placeholder="Nome ou endereço (ex: Paulista)" onBuscar={buscar} />

      {carregando ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={paradas}
          keyExtractor={item => String(item.cp)}
          ListEmptyComponent={buscou ? <Text style={estilos.vazio}>Nenhuma parada encontrada.</Text> : undefined}
          renderItem={({ item }) => (
            <TouchableOpacity style={estilos.card} onPress={() => navigation.navigate('Previsao', { parada: item })}>
              <Text style={estilos.titulo}>🚏 {item.np}</Text>
              <Text style={estilos.subtitulo}>{item.ed}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}