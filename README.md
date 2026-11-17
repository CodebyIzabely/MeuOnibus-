# 🚌 Meu Ônibus SP

Aplicativo mobile em **React Native (Expo)** desenvolvido para a Global Solution da disciplina **Cross-Platform Application Development** (FIAP – Ciência da Computação).

O app facilita a mobilidade urbana em São Paulo consumindo a **API Olho Vivo da SPTrans**, permitindo ao cidadão consultar linhas, paradas e a previsão de chegada dos ônibus em tempo real, com favoritos e histórico salvos localmente via **AsyncStorage**.

## ✨ Funcionalidades

- **Buscar linha** pelo número ou destino (ex: `8000`), mostrando o sentido da linha
- **Detalhe da linha**: paradas do itinerário e quantidade de ônibus circulando agora
- **Buscar parada** pelo nome ou endereço (ex: `Paulista`)
- **Previsão de chegada**: próximos ônibus em cada parada, com horário e "em X min", atualizando a cada 30 segundos
- **Favoritos** (linhas e paradas), salvos no celular com AsyncStorage
- **Histórico de buscas recentes**, salvo com AsyncStorage

## 🛠 Tecnologias

- React Native + Expo (TypeScript)
- React Navigation (Native Stack)
- AsyncStorage (`@react-native-async-storage/async-storage`)
- API Olho Vivo – SPTrans (v2.1)

## ▶️ Como executar

1. Instale o Node.js (LTS) e o app **Expo Go** no celular
2. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/CodebyIzabely/MeuOnibus-.git
   cd MeuOnibus-
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. (Opcional) Para usar outro token da SPTrans, altere `TOKEN` em `src/services/api.ts`
5. Inicie o projeto:
   ```bash
   npx expo start
   ```
6. Escaneie o QR code com o Expo Go (celular e computador na mesma rede Wi-Fi)

## 👥 Integrantes

| Nome completo | RM |
|---|---|
| Ana Clara Alcântara | RM568463 |
| Ana Flavia Chaves | RM566603 |
| Izabely Santos | RM567088 |