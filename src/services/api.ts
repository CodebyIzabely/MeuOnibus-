const BASE = 'https://api.olhovivo.sptrans.com.br/v2.1';
const TOKEN = '905d6ca760cd211c0aad08d0fdca8e2eb2958b7020819a84c4b1d21175d63716';
let logado = false;

export type Linha = {
  cl: number;   
  lc: boolean;  
  lt: string;   
  tl: number;   
  sl: number;   
  tp: string;   
  ts: string;  
};

export type Parada = {
  cp: number;   
  np: string;   
  ed: string;   
  py: number;   
  px: number;   
};

export type Veiculo = { p: number; t?: string; a: boolean; ta: string; py: number; px: number };

export type PrevisaoLinha = {
  c: string;    
  cl: number;
  sl: number;
  lt0: string;  
  lt1: string;  
  qv: number;   
  vs: Veiculo[];
};

export type Previsao = {
  hr: string;
  p: { cp: number; np: string; py: number; px: number; l: PrevisaoLinha[] } | null;
};

export type Posicao = { hr: string; vs: Veiculo[] };


async function login(): Promise<void> {
  const r = await fetch(`${BASE}/Login/Autenticar?token=${TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': '0' },
    body: '',
  });
  const txt = await r.text();
  console.log('LOGIN SPTRANS:', r.status, txt.slice(0, 100));
  logado = txt.trim() === 'true';
  if (!logado) throw new Error('Falha ao autenticar na SPTrans (status ' + r.status + ')');
}

async function get<T>(path: string): Promise<T> {
  if (!logado) await login();
  let r = await fetch(`${BASE}${path}`);
  if (r.status === 401) {
    await login();
    r = await fetch(`${BASE}${path}`);
  }
  return r.json();
}

export const buscarLinhas = (termo: string) =>
  get<Linha[]>(`/Linha/Buscar?termosBusca=${encodeURIComponent(termo)}`);

export const buscarParadas = (termo: string) =>
  get<Parada[]>(`/Parada/Buscar?termosBusca=${encodeURIComponent(termo)}`);

export const paradasDaLinha = (cl: number) =>
  get<Parada[]>(`/Parada/BuscarParadasPorLinha?codigoLinha=${cl}`);

export const previsaoParada = (cp: number) =>
  get<Previsao>(`/Previsao/Parada?codigoParada=${cp}`);

export const posicaoLinha = (cl: number) =>
  get<Posicao>(`/Posicao/Linha?codigoLinha=${cl}`);

export const letreiro = (l: { lt: string; tl: number }) => `${l.lt}-${l.tl}`;

export const sentido = (l: Linha) => (l.sl === 1 ? `${l.tp} → ${l.ts}` : `${l.ts} → ${l.tp}`);