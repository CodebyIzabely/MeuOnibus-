import { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { buscarLinhas } from './src/services/api';

export default function App() {
  const [res, setRes] = useState('carregando...');
  useEffect(() => {
    buscarLinhas('8000')
      .then(d => {
        console.log('RESULTADO:', d);
        setRes(JSON.stringify(d, null, 2));
      })
      .catch(e => {
        console.log('ERRO:', e.message);
        setRes('ERRO: ' + e.message);
      });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ marginTop: 60, padding: 10 }}>
        <Text style={{ color: '#000', fontSize: 14 }}>{res}</Text>
      </ScrollView>
    </View>
  );
}