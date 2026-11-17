const BASE = 'https://api.olhovivo.sptrans.com.br/v2.1';
const TOKEN = '905d6ca760cd211c0aad08d0fdca8e2eb2958b7020819a84c4b1d21175d63716';
let logado = false;

async function login(): Promise<void> {
  const r = await fetch(`${BASE}/Login/Autenticar?token=${TOKEN}`, { method: 'POST' });
  logado = (await r.json()) === true;
  if (!logado) throw new Error('Falha ao autenticar na SPTrans');
}

async function get<T>(path: string): Promise<T> {
  if (!logado) await login();
  let r = await fetch(`${BASE}${path}`);
  if (r.status === 401) { await login(); r = await fetch(`${BASE}${path}`); }
  return r.json();
}

export type Linha = { cl: number; lt: string; tl: number; sl: number; tp: string; ts: string };
export type Parada = { cp: number; np: string; ed: string; py: number; px: number };

export const buscarLinhas   = (t: string) => get<Linha[]>(`/Linha/Buscar?termosBusca=${encodeURIComponent(t)}`);
export const buscarParadas  = (t: string) => get<Parada[]>(`/Parada/Buscar?termosBusca=${encodeURIComponent(t)}`);
export const paradasDaLinha = (cl: number) => get<Parada[]>(`/Parada/BuscarParadasPorLinha?codigoLinha=${cl}`);
export const previsaoParada = (cp: number) => get<any>(`/Previsao/Parada?codigoParada=${cp}`);
export const posicaoLinha   = (cl: number) => get<any>(`/Posicao/Linha?codigoLinha=${cl}`);