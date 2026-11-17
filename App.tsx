import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { RootStackParamList } from './src/navigation';
import { cores } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import LinhasScreen from './src/screens/LinhasScreen';
import LinhaDetalheScreen from './src/screens/LinhaDetalheScreen';
import PrevisaoScreen from './src/screens/PrevisaoScreen';
import ParadasScreen from './src/screens/ParadasScreen';
import FavoritosScreen from './src/screens/FavoritosScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: cores.primaria },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meu Ônibus SP' }} />
        <Stack.Screen name="Linhas" component={LinhasScreen} options={{ title: 'Buscar linha' }} />
        <Stack.Screen name="LinhaDetalhe" component={LinhaDetalheScreen} options={{ title: 'Linha' }} />
        <Stack.Screen name="Previsao" component={PrevisaoScreen} options={{ title: 'Próximos ônibus' }} />
        <Stack.Screen name="Paradas" component={ParadasScreen} options={{ title: 'Buscar parada' }} />
        <Stack.Screen name="Favoritos" component={FavoritosScreen} options={{ title: 'Meus favoritos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}