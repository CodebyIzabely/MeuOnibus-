import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { estilos, cores } from '../theme';

type Props = {
  placeholder: string;
  onBuscar: (termo: string) => void;
  valorInicial?: string;
};

// Campo de texto + botão "Buscar", usado nas telas de linhas e paradas
export default function CampoBusca({ placeholder, onBuscar, valorInicial = '' }: Props) {
  const [texto, setTexto] = useState(valorInicial);

  const buscar = () => {
    if (texto.trim().length > 0) onBuscar(texto.trim());
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <TextInput
        style={estilos.input}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSuave}
        value={texto}
        onChangeText={setTexto}
        onSubmitEditing={buscar}
        returnKeyType="search"
        autoCorrect={false}
      />
      <TouchableOpacity style={estilos.botao} onPress={buscar}>
        <Text style={estilos.botaoTexto}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}