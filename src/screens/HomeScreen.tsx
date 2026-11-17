import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TelaProps } from '../navigation';
import { cores, estilos } from '../theme';

export default function HomeScreen({ navigation }: TelaProps<'Home'>) {
  return (
    <View style={[estilos.tela, estilos.conteudo]}>
      <Text style={s.boasVindas}>Para onde você vai hoje?</Text>
      <Text style={[estilos.subtitulo, { marginBottom: 10 }]}>
        Consulte linhas, paradas e a previsão de chegada dos ônibus de São Paulo.
      </Text>

      <BotaoMenu emoji="🚌" titulo="Buscar linha" desc="Pelo número ou destino (ex: 8000)" onPress={() => navigation.navigate('Linhas')} />
      <BotaoMenu emoji="🚏" titulo="Buscar parada" desc="Pelo nome ou endereço (ex: Paulista)" onPress={() => navigation.navigate('Paradas')} />
      <BotaoMenu emoji="⭐" titulo="Meus favoritos" desc="Linhas e paradas salvas" onPress={() => navigation.navigate('Favoritos')} />
    </View>
  );
}

function BotaoMenu(props: { emoji: string; titulo: string; desc: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={[estilos.card, s.botao]} onPress={props.onPress} activeOpacity={0.7}>
      <Text style={s.emoji}>{props.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={estilos.titulo}>{props.titulo}</Text>
        <Text style={estilos.subtitulo}>{props.desc}</Text>
      </View>
      <Text style={s.seta}>›</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  boasVindas: { fontSize: 24, fontWeight: '800', color: cores.texto, marginTop: 8 },
  botao: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, marginTop: 6 },
  emoji: { fontSize: 32, marginRight: 14 },
  seta: { fontSize: 28, color: cores.textoSuave },
});