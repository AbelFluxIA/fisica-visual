/* ============================================================
   EXPEDIÇÃO TITANIC — missão guiada sobre a sala do oceano
   ------------------------------------------------------------
   Este arquivo é CONTEÚDO, não motor: o roteiro (ROTEIRO, lá embaixo)
   é uma lista de passos — falar, viajar, encontrar um ser vivo,
   perguntar — e é o que um professor vai querer mudar. O motor 3D fica
   em index.html e só é acionado pela ponte window.__fv.

   Fontes dos fatos usados nas perguntas (conferidos em 19/11/2026):
   Wikipedia em inglês, verbetes "Titanic", "Sinking of the Titanic",
   "Wreck of the Titanic" e "Lifeboats of the Titanic" — comprimento
   269 m; ~2.200 pessoas a bordo; 20 botes com 1.178 lugares (a regra
   exigia 16); ~1.500 mortos; sobreviventes resgatados pelo Carpathia;
   colisão 2h40 antes de afundar às 02:20; naufrágio a ~3.800 m,
   achado em 1/9/1985; proa e popa a ~600 m uma da outra; aviso do
   Mesaba às 21:52; velocidade ~22 nós (41 km/h); Halomonas titanicae.

   Nada é enviado pela internet: nome, respostas e diário ficam no
   localStorage deste aparelho.
   ============================================================ */

const fv = window.__fv;
const KEY = 'fv-expedicao-titanic-v1';
const MATERIAS = { mat: 'Matemática', cie: 'Ciências', lei: 'Leitura e História' };
const ETAPAS = [
  { titulo: 'Preparar a descida' },
  { titulo: 'Descer pelas zonas do oceano' },
  { titulo: 'O navio no fundo do mar' },
  { titulo: 'Dentro do Titanic' },
  { titulo: 'Diário de bordo' }
];

/* onde o submersível reaparece ao retomar cada etapa: [posição], [olhar] */
const W = { x: 0, y: -3800, z: 0 };            // centro do naufrágio no mundo
/* a vista de chegada: à frente e ao lado da proa, olhando para trás ao
   longo do casco — o ângulo das fotos clássicas do naufrágio.
   [deslocamento da câmera], [ponto olhado], em coordenadas do navio */
const CHEGADA = [[46, 28, 114], [0, 13, 22]];
const LADO_DO_NAVIO = [[W.x + CHEGADA[0][0], W.y + CHEGADA[0][1], W.z + CHEGADA[0][2]],
                       [W.x + CHEGADA[1][0], W.y + CHEGADA[1][1], W.z + CHEGADA[1][2]]];
const RETOMADA = [
  [[0, -5, 40], [0, -200, -400]],
  [[0, -5, 40], [0, -200, -400]],
  LADO_DO_NAVIO, LADO_DO_NAVIO, LADO_DO_NAVIO
];

/* ---------------------------------------------------------------
   ROTEIRO
   t: 'fala'    cartão de texto, um botão
      'pergunta' múltipla escolha; `certa` é o índice da resposta
      'ir'      viagem; `faz(pronto)` chama a ponte e avisa ao chegar
      'ser'     procura o ser vivo mais próximo, vai até ele, registra
      'olhar'   solta o controle; o botão fica no painel
      'diario' / 'relatorio'
   e: índice da etapa (0 a 4)
   --------------------------------------------------------------- */
const ROTEIRO = [
  /* ===== Etapa 1 — Preparar a descida ===== */
  { e: 0, t: 'fala', h: 'Sua missão: chegar ao Titanic',
    html: '<p>Você pilota um submersível de pesquisa. O <b>RMS Titanic</b> está a <b>3.800 metros</b> de profundidade, no Atlântico Norte, desde 1912.</p>' +
          '<p>Você vai descer pelas zonas do oceano, registrar os seres vivos que encontrar, examinar o navio por fora e por dentro e voltar com um <b>diário de bordo</b>.</p>' +
          '<p>Antes de mergulhar, toda expedição faz as contas.</p>',
    btn: 'fazer as contas →' },

  { e: 0, t: 'pergunta', id: 'm1', m: 'mat', curta: 'Tempo de descida',
    q: 'O Titanic está a 3.800 metros de profundidade. Seu submersível desce 25 metros por minuto. Quanto tempo leva para chegar ao fundo?',
    ops: ['38 minutos', '76 minutos', '152 minutos', '380 minutos'], certa: 2,
    dica: 'Descendo 25 metros por minuto, você faz 100 metros em 4 minutos. Quantos grupos de 100 metros cabem em 3.800?',
    porque: '3.800 ÷ 25 = 152 minutos, pouco mais de duas horas e meia. Aqui a descida é acelerada; numa expedição de verdade ela leva horas, no escuro.' },

  { e: 0, t: 'pergunta', id: 'm2', m: 'mat', curta: 'Pressão no fundo',
    q: 'No mar, a pressão aumenta 1 atmosfera a cada 10 metros de profundidade. Na superfície já existe 1 atmosfera, a do ar. Qual é a pressão a 3.800 metros?',
    ops: ['38 atmosferas', '381 atmosferas', '3.801 atmosferas', '39 atmosferas'], certa: 1,
    dica: '3.800 ÷ 10 dá a parte da água. Não esqueça de somar a atmosfera do ar, que já estava lá em cima.',
    porque: '380 da água + 1 do ar = 381 atmosferas. São quase 400 quilos apertando cada centímetro quadrado do submersível, um espaço do tamanho de uma unha.' },

  /* ===== Etapa 2 — Descer ===== */
  { e: 1, t: 'ir', cap: 'Mergulhando. Zona da luz: os primeiros 200 metros, onde o Sol ainda alimenta as algas.',
    faz: p => fv.diveTo(60, p) },
  { e: 1, t: 'ser', nome: 'Água-viva-da-lua', sci: 'Aurelia aurita' },
  { e: 1, t: 'pergunta', id: 'c1', m: 'cie', curta: 'Corpo da água-viva',
    q: 'A água-viva-da-lua não tem cérebro, coração nem sangue. De que é feita a maior parte do corpo dela?',
    ops: ['De gordura', 'De ar', 'De água', 'De cartilagem'], certa: 2,
    dica: 'Olhe para ela: é quase transparente, da cor do lugar onde vive.',
    porque: 'Cerca de 95% do corpo dela é água. Mesmo assim ela nada, come e se defende: é um animal completo, só que muito simples.' },

  { e: 1, t: 'ir', cap: 'Continue descendo e repare na cor da água mudando.',
    faz: p => fv.diveTo(260, p), espera: 2200 },
  { e: 1, t: 'pergunta', id: 'c2', m: 'cie', curta: 'Cor que some primeiro',
    q: 'A água absorve as cores da luz do Sol uma por uma. Qual cor desaparece primeiro, já nos primeiros metros?',
    ops: ['Azul', 'Verde', 'Violeta', 'Vermelho'], certa: 3,
    dica: 'Pense na cor do mar visto de longe. Essa é a cor que sobra, não a que some.',
    porque: 'O vermelho some nos primeiros 15 metros. O azul é a cor que consegue ir mais fundo, e por isso o mar é azul. A 200 metros, um peixe vermelho parece preto.' },

  { e: 1, t: 'ir', cap: 'Zona crepuscular, de 200 a 1.000 metros: resta só um fio de luz azul.',
    faz: p => fv.diveTo(600, p) },
  { e: 1, t: 'ser', nome: 'Peixe-lanterna', sci: 'família Myctophidae' },
  { e: 1, t: 'pergunta', id: 'c3', m: 'cie', curta: 'Migração do peixe-lanterna',
    q: 'Os peixes-lanterna sobem para perto da superfície só à noite e descem de volta antes de amanhecer. Por que eles fazem essa viagem no escuro?',
    ops: ['Porque no escuro é mais difícil os predadores enxergarem', 'Porque a água de cima esquenta à noite', 'Porque dormem boiando na superfície', 'Porque a Lua puxa os peixes para cima'], certa: 0,
    dica: 'Lá em cima há muita comida, mas também muitos caçadores que usam os olhos.',
    porque: 'Eles sobem para comer onde há mais alimento e fazem isso quando quem caça com os olhos não consegue vê-los. Bilhões de peixes repetem isso todo dia: é a maior migração animal do planeta.' },

  { e: 1, t: 'ir', cap: 'Zona da meia-noite. Abaixo de 1.000 metros nenhuma luz do Sol chega, nunca.',
    faz: p => fv.diveTo(1500, p) },
  { e: 1, t: 'ser', nome: 'Peixe-pescador-abissal', sci: 'Melanocetus johnsonii' },
  { e: 1, t: 'pergunta', id: 'c4', m: 'cie', curta: 'Luz do peixe-pescador',
    q: 'No escuro total, o peixe-pescador balança uma pequena "lanterna" na frente da boca para atrair presas. Quem produz essa luz?',
    ops: ['O reflexo da luz do Sol', 'Bactérias que vivem dentro da isca', 'Faíscas dos dentes dele', 'Um pedaço de pedra brilhante'], certa: 1,
    dica: 'A luz do Sol não chega até aqui. Quem está acendendo vive junto com o peixe.',
    porque: 'A isca é a casa de bactérias que brilham. O peixe dá abrigo e alimento, as bactérias dão a luz: os dois saem ganhando. Luz fabricada por seres vivos se chama bioluminescência.' },

  { e: 1, t: 'ir', cap: 'Últimos 2.300 metros. Água a cerca de 2 °C. As luzes da expedição já estão acesas lá embaixo.',
    faz: p => fv.diveTo(3350, () => fv.viewHull(CHEGADA[0], CHEGADA[1], p, 95)), espera: 2600 },

  /* ===== Etapa 3 — O navio ===== */
  { e: 2, t: 'olhar', cap: 'RMS Titanic, 3.800 metros. Arraste a tela para olhar o navio; quando quiser, continue.' },
  { e: 2, t: 'fala', h: 'Você chegou ao Titanic',
    html: '<p>O navio afundou na madrugada de <b>15 de abril de 1912</b> e só foi encontrado em <b>1º de setembro de 1985</b>, 73 anos depois.</p>' +
          '<p>O que está na sua frente é a <b>proa</b>, a parte da frente. O Titanic se partiu em dois ao afundar, e a popa está a cerca de 600 metros daqui.</p>',
    btn: 'examinar o navio →' },
  { e: 2, t: 'pergunta', id: 'm3', m: 'mat', curta: 'Tamanho do navio em ônibus',
    q: 'Inteiro, o Titanic media 269 metros. Um ônibus tem cerca de 12 metros. Mais ou menos quantos ônibus enfileirados dariam o comprimento do navio?',
    ops: ['12 ônibus', '22 ônibus', '32 ônibus', '120 ônibus'], certa: 1,
    dica: '12 × 10 = 120. 12 × 20 = 240. Falta pouco para chegar a 269.',
    porque: '269 ÷ 12 dá pouco mais de 22. Imagine 22 ônibus em fila, um atrás do outro: era o maior navio do mundo em 1912.' },

  { e: 2, t: 'ir', cap: 'Chegando perto do casco. Repare no que está pendurado no metal.',
    faz: p => fv.viewHull([38, 22, 45], [0, 14, 20], p), espera: 2400 },
  { e: 2, t: 'pergunta', id: 'c5', m: 'cie', curta: 'O que consome o casco',
    q: 'Essas "estalactites" cor de ferrugem que escorrem pelo casco existem no navio inteiro. O que está formando elas?',
    ops: ['Sal do mar grudando no metal', 'Lama do fundo subindo pelo casco', 'Tinta velha descascando', 'Bactérias que se alimentam do ferro'], certa: 3,
    dica: 'Não é um efeito da água parada. Alguma coisa viva está usando o navio como comida.',
    porque: 'São colônias de bactérias que consomem o ferro. Uma delas foi descoberta aqui e ganhou o nome do navio: Halomonas titanicae. Elas trabalham tão depressa que os pesquisadores calculam que o casco pode desabar nas próximas décadas.' },

  /* ===== Etapa 4 — Dentro ===== */
  { e: 3, t: 'ir', cap: 'Entrando pelo vão da Escadaria Grande, o mesmo caminho dos robôs de exploração.',
    faz: p => fv.routeInside([[0, 24.5, 0], [-12.5, 24.3, 0]], p), espera: 1800 },
  { e: 3, t: 'fala', h: 'Ponte de comando',
    html: '<p>Era daqui que o capitão <b>Edward Smith</b> comandava o navio.</p>' +
          '<p>Na noite de 14 de abril de 1912, outros navios avisaram pelo telégrafo sem fio o que estavam vendo no mar. Leia um desses avisos com atenção.</p>',
    btn: 'ler o telegrama →' },
  { e: 3, t: 'pergunta', id: 'p1', m: 'lei', curta: 'O aviso do Mesaba',
    doc: { cab: 'Telegrama sem fio · 14 de abril de 1912 · 21h52 · do navio Mesaba para o Titanic',
           txt: 'Vimos muito gelo compacto e grande número de icebergs grandes. Também campos de gelo.',
           rod: 'Mensagem real, traduzida do inglês.' },
    q: 'O que o navio Mesaba estava avisando?',
    ops: ['Que precisava de ajuda', 'Que vinha uma tempestade', 'Que havia muito gelo e icebergs no caminho', 'Que o Titanic estava atrasado'], certa: 2,
    dica: 'Releia o telegrama: o que o Mesaba diz que viu?',
    porque: 'O Mesaba estava contando o que tinha acabado de ver: gelo e icebergs grandes, bem na rota do Titanic. Faltavam menos de duas horas para a colisão.' },
  { e: 3, t: 'pergunta', id: 'p2', m: 'lei', curta: 'O aviso que não chegou',
    q: 'O operador de rádio recebeu esse aviso, mas até hoje não se sabe se ele saiu da sala do telégrafo e chegou ao capitão. O navio seguiu a cerca de 41 km/h. O que essa história mostra?',
    ops: ['Que o rádio do Titanic estava quebrado', 'Que uma informação só ajuda se chegar a quem decide', 'Que não havia gelo naquela noite', 'Que o Mesaba mandou a mensagem tarde demais'], certa: 1,
    dica: 'O aviso existiu e foi recebido. O problema aconteceu depois disso.',
    porque: 'O aviso estava certo e chegou ao navio. O que talvez tenha faltado foi o último passo: levar a mensagem a quem podia mudar a rota ou diminuir a velocidade.' },
  { e: 3, t: 'pergunta', id: 'm4', m: 'mat', curta: 'Duração do naufrágio',
    q: 'O Titanic bateu no iceberg às 23h40 e desapareceu no mar às 2h20 da madrugada. Quanto tempo o navio levou para afundar?',
    ops: ['2 horas e 40 minutos', '1 hora e 40 minutos', '3 horas e 20 minutos', '21 horas e 20 minutos'], certa: 0,
    dica: 'Das 23h40 até a meia-noite são 20 minutos. Depois some as 2 horas e 20 minutos da madrugada.',
    porque: '20 minutos até a meia-noite + 2h20 = 2 horas e 40 minutos. Foi esse o tempo que as pessoas tiveram para deixar o navio.' },

  { e: 3, t: 'ir', cap: 'Voltando para a Escadaria Grande. Agora, o mesmo lugar em 1912.',
    faz: p => fv.routeInside([[0, 24.5, 0], [0, 8.6, -6.4]], () => { fv.setEra(true); p(); }, [0, 9.6, 6]), espera: 900 },
  { e: 3, t: 'olhar', cap: 'Abril de 1912: a mesma escadaria, como os passageiros a viram. Olhe em volta; quando quiser, continue.' },
  { e: 3, t: 'pergunta', id: 'm5', m: 'mat', curta: 'Lugares nos botes',
    q: 'Havia cerca de 2.200 pessoas a bordo. Os 20 botes salva-vidas, todos juntos, tinham lugar para 1.178. Mesmo com todos os botes cheios, quantas pessoas ficariam sem lugar?',
    ops: ['922 pessoas', '1.122 pessoas', '1.022 pessoas', '3.378 pessoas'], certa: 2,
    dica: 'É uma subtração: 2.200 − 1.178. Comece tirando 1.200 e depois devolva o que tirou a mais.',
    porque: '2.200 − 1.178 = 1.022. Os botes só comportavam pouco mais da metade das pessoas, e isso era permitido: a regra da época exigia 16 botes, e o Titanic levava 20. Cerca de 1.500 pessoas morreram. O naufrágio mostrou que a regra estava ultrapassada.' },
  { e: 3, t: 'pergunta', id: 'p3', m: 'lei', curta: 'O pedido de socorro',
    doc: { cab: 'Pedido de socorro transmitido pelo Titanic · madrugada de 15 de abril de 1912',
           txt: 'SOS SOS CQD CQD — MGY — Estamos afundando depressa. Passageiros sendo colocados nos botes. — MGY',
           rod: 'Reconstituição de uma das mensagens, traduzida do inglês. SOS e CQD eram os dois sinais de socorro usados na época.' },
    q: 'As letras MGY aparecem antes e depois do recado. Pelo lugar em que estão na mensagem, o que elas devem ser?',
    ops: ['O código que identifica o Titanic, como uma assinatura', 'O nome do capitão', 'A posição do navio no mapa', 'Um pedido de silêncio no rádio'], certa: 0,
    dica: 'Pense em uma carta: o que costuma vir no começo e no fim, dizendo quem escreveu?',
    porque: 'MGY era o indicativo de chamada do Titanic: cada navio tinha o seu, e era assim que os operadores sabiam quem estava falando. O navio Carpathia ouviu o pedido e resgatou os sobreviventes.' },

  { e: 3, t: 'ir', cap: 'Voltando para o presente e saindo do navio.',
    faz: p => { fv.setEra(false); fv.leaveWreck(); fv.viewHull(CHEGADA[0], CHEGADA[1], p, 60); }, espera: 1500 },

  /* ===== Etapa 5 — Diário ===== */
  { e: 4, t: 'diario' },
  { e: 4, t: 'relatorio' }
];

const PERGUNTAS = ROTEIRO.filter(b => b.t === 'pergunta');

/* ============================================================
   ESTADO (só neste aparelho)
   ============================================================ */
function novoEstado(){
  return { v: 1, nome: '', turma: '', inicio: Date.now(), fim: 0, passo: 0,
           ativoMs: 0, respostas: {}, seres: [], diario: '' };
}
function carregar(){
  try{
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    return (s && s.v === 1 && typeof s.passo === 'number') ? s : null;
  }catch(e){ return null; }
}
function salvar(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

let S = carregar();
let ativa = false;          // a missão está no comando agora?
let ficha = 0;              // invalida callbacks de um passo abandonado

/* ============================================================
   DOM
   ============================================================ */
function el(tag, cls, html){
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}
function esc(s){
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const painel = el('div');
painel.id = 'expPanel';
painel.innerHTML =
  '<div class="row"><span class="eyebrow" id="expEtapa"></span>' +
  '<button id="expQuit" type="button">sair</button></div>' +
  '<div class="ttl" id="expTtl"></div>' +
  '<p class="cap" id="expCap" aria-live="polite"></p>' +
  '<div class="bar"><i id="expBar"></i></div>' +
  '<button class="act" id="expAct" type="button">continuar →</button>';
document.body.appendChild(painel);

const folha = el('div');
folha.id = 'expSheet';
folha.setAttribute('role', 'dialog');
folha.setAttribute('aria-modal', 'true');
document.body.appendChild(folha);

const $etapa = painel.querySelector('#expEtapa');
const $ttl = painel.querySelector('#expTtl');
const $cap = painel.querySelector('#expCap');
const $bar = painel.querySelector('#expBar');
const $act = painel.querySelector('#expAct');

function legenda(txt){ $cap.textContent = txt || ''; }
function botaoPainel(txt, fn){
  if (!txt){ $act.classList.remove('show'); $act.onclick = null; return; }
  $act.textContent = txt;
  $act.onclick = fn;
  $act.classList.add('show');
}
function abrirFolha(card, opts){
  folha.innerHTML = '';
  folha.className = 'show' + (opts && opts.baixa ? ' baixa' : '');
  folha.appendChild(card);
  document.body.classList.add('exp-sheet');
  card.scrollTop = 0;
  const alvo = card.querySelector('[data-foco]') || card.querySelector('button, input, textarea');
  if (alvo && !(opts && opts.semFoco)) try{ alvo.focus({ preventScroll: true }); }catch(e){}
}
function fecharFolha(){
  folha.className = '';
  folha.innerHTML = '';
  document.body.classList.remove('exp-sheet');
}
function acoes(...bts){
  const a = el('div', 'actions');
  bts.forEach(b => a.appendChild(b));
  return a;
}
function botao(cls, txt, fn){
  const b = el('button', cls);
  b.type = 'button';
  b.textContent = txt;
  b.addEventListener('click', fn);
  return b;
}

/* ============================================================
   MOTOR DO ROTEIRO
   ============================================================ */
function atualizarPainel(b){
  const et = ETAPAS[b.e];
  $etapa.textContent = 'Expedição Titanic · etapa ' + (b.e + 1) + ' de ' + ETAPAS.length;
  $ttl.textContent = et.titulo;
  $bar.style.width = Math.round(S.passo / (ROTEIRO.length - 1) * 100) + '%';
}

function rodar(i){
  if (!ativa) return;
  if (i >= ROTEIRO.length) i = ROTEIRO.length - 1;
  ficha++;
  S.passo = i;
  salvar();
  const b = ROTEIRO[i];
  atualizarPainel(b);
  botaoPainel(null);
  const minha = ficha;
  const proximo = () => { if (ativa && minha === ficha) rodar(i + 1); };
  PASSOS[b.t](b, proximo);
}

/* viagem com rede de segurança: se o motor perder o destino por qualquer
   motivo, a missão segue em frente em vez de travar a criança */
function viajar(faz, aoChegar){
  const minha = ficha;
  let feito = false;
  const t0 = Date.now();
  let parado = 0;
  const fim = () => {
    if (feito) return;
    feito = true;
    clearInterval(vigia);
    if (minha === ficha && ativa) aoChegar();
  };
  const vigia = setInterval(() => {
    if (minha !== ficha || !ativa){ clearInterval(vigia); return; }
    if (!fv.isTravelling()){ if (++parado >= 3 && Date.now() - t0 > 2500) fim(); }
    else parado = 0;
    if (Date.now() - t0 > 150000) fim();
  }, 600);
  try{ faz(fim); }catch(e){ console.warn('[expedição] viagem falhou', e); fim(); }
}

const PASSOS = {
  fala(b, proximo){
    legenda('');
    const c = el('div', 'card');
    c.appendChild(el('div', 'eyebrow', 'Etapa ' + (b.e + 1) + ' de ' + ETAPAS.length + ' · ' + esc(ETAPAS[b.e].titulo)));
    c.appendChild(el('h2', '', esc(b.h)));
    c.appendChild(el('div', '', b.html));
    c.appendChild(acoes(botao('go', b.btn || 'continuar →', () => { fecharFolha(); proximo(); })));
    abrirFolha(c);
  },

  ir(b, proximo){
    fecharFolha();
    legenda(b.cap);
    viajar(b.faz, () => {
      const minha = ficha;
      setTimeout(() => { if (minha === ficha) proximo(); }, b.espera || 1400);
    });
  },

  olhar(b, proximo){
    fecharFolha();
    legenda(b.cap);
    botaoPainel('continuar →', proximo);
  },

  ser(b, proximo){
    if (S.seres.indexOf(b.nome) >= 0){ proximo(); return; }
    const poi = fv.nearestCreature(b.nome);
    if (!poi){ proximo(); return; }
    fecharFolha();
    legenda('Tem um ser vivo por perto. Aproximando…');
    viajar(p => fv.visitCreature(poi, p), () => {
      legenda('Observe e registre no diário de bordo.');
      const c = el('div', 'card');
      c.appendChild(el('div', 'eyebrow', 'Ser vivo encontrado · ' + Math.round(fv.depth()) + ' m de profundidade'));
      c.appendChild(el('h2', '', esc(b.nome)));
      c.appendChild(el('p', 'sci', esc(b.sci)));
      c.appendChild(el('p', '', esc(poi.fact || '')));
      c.appendChild(acoes(botao('go', 'registrar no diário →', () => {
        if (S.seres.indexOf(b.nome) < 0) S.seres.push(b.nome);
        salvar();
        fecharFolha();
        proximo();
      })));
      abrirFolha(c, { baixa: true, semFoco: true });
    });
  },

  pergunta(b, proximo){
    if (S.respostas[b.id]){ proximo(); return; }      // já respondida (retomada)
    legenda('Responda para continuar.');
    const n = PERGUNTAS.indexOf(b) + 1;
    const c = el('div', 'card');
    c.appendChild(el('div', 'eyebrow', MATERIAS[b.m] + ' · pergunta ' + n + ' de ' + PERGUNTAS.length));
    if (b.doc){
      const d = el('div', 'doc');
      d.appendChild(el('div', 'hd', esc(b.doc.cab)));
      d.appendChild(el('p', 'tx', esc(b.doc.txt)));
      d.appendChild(el('p', 'ft', esc(b.doc.rod)));
      c.appendChild(d);
    }
    c.appendChild(el('p', 'q', esc(b.q)));
    const ops = el('div', 'opts');
    const fb = el('div', 'fb');
    fb.setAttribute('aria-live', 'polite');
    const seguir = botao('go', 'continuar →', () => { fecharFolha(); proximo(); });
    seguir.style.display = 'none';
    const t0 = Date.now();
    let tent = 0;
    b.ops.forEach((txt, k) => {
      const o = botao('opt', txt, () => {
        tent++;
        if (k === b.certa){
          o.classList.add('yes');
          ops.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
          fb.className = 'fb good show';
          fb.innerHTML = '<b>' + (tent === 1 ? 'Isso mesmo.' : 'Agora sim.') + '</b> ' + esc(b.porque);
          S.respostas[b.id] = { tent: tent, ms: Date.now() - t0 };
          salvar();
          seguir.style.display = '';
          seguir.focus({ preventScroll: true });
          fb.scrollIntoView({ block: 'nearest' });
        } else {
          o.classList.add('no');
          o.disabled = true;
          fb.className = 'fb hint show';
          fb.innerHTML = '<b>Ainda não.</b> ' + esc(b.dica);
        }
      });
      ops.appendChild(o);
    });
    c.appendChild(ops);
    c.appendChild(fb);
    c.appendChild(acoes(seguir));
    abrirFolha(c, { semFoco: true });
  },

  diario(b, proximo){
    legenda('Última etapa: conte o que você viu.');
    const c = el('div', 'card');
    c.appendChild(el('div', 'eyebrow', 'Etapa 5 de 5 · Diário de bordo'));
    c.appendChild(el('h2', '', 'Conte a sua expedição'));
    c.appendChild(el('p', '', 'Todo explorador escreve o que viu, enquanto ainda lembra. Escreva de 4 a 6 frases. Estas perguntas ajudam:'));
    c.appendChild(el('ul', 'guia',
      '<li>O que mudou na água enquanto você descia?</li>' +
      '<li>Qual ser vivo mais chamou a sua atenção, e por quê?</li>' +
      '<li>Como estava o navio? O que mais surpreendeu você?</li>' +
      '<li>O que você ainda quer descobrir sobre o Titanic?</li>'));
    const ta = el('textarea');
    ta.setAttribute('data-foco', '');
    ta.setAttribute('aria-label', 'Seu diário de bordo');
    ta.placeholder = 'Hoje eu desci até o Titanic…';
    ta.value = S.diario || '';
    c.appendChild(ta);
    const conta = el('p', 'count');
    c.appendChild(conta);
    const MIN = 15;
    const ok = botao('go', 'ver meu diário de bordo →', () => {
      S.diario = ta.value.trim();
      S.fim = S.fim || Date.now();
      salvar();
      fecharFolha();
      proximo();
    });
    const palavras = () => (ta.value.trim().match(/\S+/g) || []).length;
    const atualiza = () => {
      const p = palavras();
      conta.textContent = p + (p === 1 ? ' palavra' : ' palavras') + (p < MIN ? ' · escreva pelo menos ' + MIN : '');
      ok.disabled = p < MIN;
    };
    ta.addEventListener('input', () => { S.diario = ta.value; salvar(); atualiza(); });
    atualiza();
    c.appendChild(acoes(ok));
    abrirFolha(c);
  },

  relatorio(){
    legenda('Missão concluída.');
    $bar.style.width = '100%';
    S.fim = S.fim || Date.now();
    salvar();
    abrirFolha(cartaoRelatorio(), { semFoco: true });
  }
};

/* ============================================================
   RELATÓRIO
   ============================================================ */
function resumoPorMateria(){
  const r = {};
  Object.keys(MATERIAS).forEach(m => { r[m] = { total: 0, primeira: 0 }; });
  PERGUNTAS.forEach(b => {
    r[b.m].total++;
    const a = S.respostas[b.id];
    if (a && a.tent === 1) r[b.m].primeira++;
  });
  return r;
}
function duracaoTxt(){
  const min = Math.max(1, Math.round((S.ativoMs || 0) / 60000));
  return min + (min === 1 ? ' minuto' : ' minutos');
}
function dataTxt(){
  try{ return new Date(S.fim || Date.now()).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch(e){ return ''; }
}

function cartaoRelatorio(){
  const c = el('div', 'card rel');
  c.appendChild(el('div', 'eyebrow', 'Expedição Titanic · missão concluída'));
  c.appendChild(el('h2', '', 'Diário de bordo' + (S.nome ? ' de ' + esc(S.nome) : '')));
  c.appendChild(el('div', 'who',
    (S.turma ? '<span>turma <b>' + esc(S.turma) + '</b></span>' : '') +
    '<span>data <b>' + esc(dataTxt()) + '</b></span>' +
    '<span>tempo de missão <b>' + duracaoTxt() + '</b></span>' +
    '<span>profundidade máxima <b>3.800 m</b></span>'));

  c.appendChild(el('h3', '', 'Acertos de primeira, por matéria'));
  const r = resumoPorMateria();
  Object.keys(MATERIAS).forEach(m => {
    const row = el('div', 'mat');
    row.appendChild(el('span', 'nm', MATERIAS[m]));
    const meter = el('div', 'meter');
    const fill = el('i');
    fill.style.width = (r[m].total ? r[m].primeira / r[m].total * 100 : 0) + '%';
    meter.appendChild(fill);
    row.appendChild(meter);
    row.appendChild(el('span', 'v', r[m].primeira + ' de ' + r[m].total));
    c.appendChild(row);
  });

  c.appendChild(el('h3', '', 'Pergunta por pergunta'));
  const ol = el('ol', 'qs');
  PERGUNTAS.forEach(b => {
    const a = S.respostas[b.id];
    const li = el('li');
    const prim = a && a.tent === 1;
    li.appendChild(el('span', 'mk' + (prim ? '' : ' again'), a ? (prim ? '✓' : '↻') : '–'));
    li.appendChild(el('span', '', esc(b.curta) + ' <span style="opacity:.7">· ' + MATERIAS[b.m] + '</span>'));
    li.appendChild(el('span', 'tr', a ? (prim ? 'de primeira' : 'na ' + a.tent + 'ª tentativa') : 'não respondida'));
    ol.appendChild(li);
  });
  c.appendChild(ol);

  if (S.seres.length){
    c.appendChild(el('h3', '', 'Seres vivos registrados'));
    c.appendChild(el('div', 'chips', S.seres.map(s => '<span>' + esc(s) + '</span>').join('')));
  }

  c.appendChild(el('h3', '', 'O que eu vi'));
  c.appendChild(el('p', 'diary', esc(S.diario || '')));

  c.appendChild(el('div', 'prof',
    '<b>Para o professor:</b> este relatório foi montado no próprio aparelho do aluno. Nada foi enviado pela internet. ' +
    'Para guardar ou recolher, use "imprimir ou salvar em PDF". "Na 2ª tentativa" indica que o aluno errou, leu a dica e acertou em seguida.'));

  const copiar = botao('ghost', 'copiar resumo', () => {
    const txt = resumoTexto();
    const feito = () => { copiar.textContent = 'copiado ✓'; setTimeout(() => { copiar.textContent = 'copiar resumo'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(feito, () => { copiar.textContent = 'não foi possível copiar'; });
    } else { copiar.textContent = 'não foi possível copiar'; }
  });
  c.appendChild(acoes(
    botao('ghost', 'refazer a missão', () => {
      if (!window.confirm('Apagar este diário de bordo e começar a missão do zero?')) return;
      recomecar();
    }),
    botao('ghost', 'explorar livre', () => { sair(); }),
    copiar,
    botao('go', 'imprimir ou salvar em PDF', () => { window.print(); })
  ));
  return c;
}

function resumoTexto(){
  const r = resumoPorMateria();
  const L = [];
  L.push('EXPEDIÇÃO TITANIC — diário de bordo' + (S.nome ? ' de ' + S.nome : ''));
  if (S.turma) L.push('Turma: ' + S.turma);
  L.push('Data: ' + dataTxt() + ' · tempo de missão: ' + duracaoTxt());
  L.push('');
  L.push('Acertos de primeira:');
  Object.keys(MATERIAS).forEach(m => L.push('  ' + MATERIAS[m] + ': ' + r[m].primeira + ' de ' + r[m].total));
  L.push('');
  L.push('Pergunta por pergunta:');
  PERGUNTAS.forEach(b => {
    const a = S.respostas[b.id];
    L.push('  ' + b.curta + ' (' + MATERIAS[b.m] + '): ' + (a ? (a.tent === 1 ? 'de primeira' : 'na ' + a.tent + 'ª tentativa') : 'não respondida'));
  });
  if (S.seres.length){ L.push(''); L.push('Seres vivos registrados: ' + S.seres.join(', ')); }
  L.push('');
  L.push('O que eu vi:');
  L.push(S.diario || '');
  return L.join('\n');
}

/* ============================================================
   ENTRAR, RETOMAR, SAIR
   ============================================================ */
function ligar(){
  ativa = true;
  window.__fvMissionOn = true;
  document.body.classList.add('exp-on');
}
function sair(){
  ativa = false;
  ficha++;
  window.__fvMissionOn = false;
  fecharFolha();
  document.body.classList.remove('exp-on');
  try{
    fv.cancelTravel();
    if (fv.isEra1912()) fv.setEra(false);
  }catch(e){}
  salvar();
}
function recomecar(){
  sair();
  try{ localStorage.removeItem(KEY); }catch(e){}
  S = null;
  comecar();
}

function comecar(){
  fv.closeWelcome();
  if (S && S.fim){                 // já concluída: abre direto no diário
    ligar();
    rodar(ROTEIRO.length - 1);
    return;
  }
  if (S && S.passo > 0){           // em andamento: volta ao começo da etapa
    ligar();
    const etapa = ROTEIRO[Math.min(S.passo, ROTEIRO.length - 1)].e;
    const r = RETOMADA[etapa];
    fv.placeAt(r[0][0], r[0][1], r[0][2], r[1][0], r[1][1], r[1][2]);
    rodar(ROTEIRO.findIndex(b => b.e === etapa));
    return;
  }
  S = novoEstado();
  ligar();
  pedirNome();
}

function pedirNome(){
  atualizarPainel(ROTEIRO[0]);
  legenda('');
  const c = el('div', 'card');
  c.appendChild(el('div', 'eyebrow', 'Expedição Titanic'));
  c.appendChild(el('h2', '', 'Quem vai pilotar?'));
  c.appendChild(el('p', '', 'Seu nome aparece no diário de bordo, no fim da missão.'));
  const l1 = el('label', '', 'Seu primeiro nome');
  l1.htmlFor = 'expNome';
  const nome = el('input');
  nome.type = 'text'; nome.id = 'expNome'; nome.maxLength = 30; nome.autocomplete = 'off';
  nome.setAttribute('data-foco', '');
  const l2 = el('label', '', 'Turma (se o professor pedir)');
  l2.htmlFor = 'expTurma';
  const turma = el('input');
  turma.type = 'text'; turma.id = 'expTurma'; turma.maxLength = 20; turma.autocomplete = 'off';
  c.appendChild(l1); c.appendChild(nome); c.appendChild(l2); c.appendChild(turma);
  c.appendChild(el('p', 'fine', 'Fica guardado só neste aparelho. Nada é enviado pela internet.'));
  const ir = () => {
    S.nome = nome.value.trim();
    S.turma = turma.value.trim();
    S.inicio = Date.now();
    salvar();
    fecharFolha();
    rodar(0);
  };
  c.appendChild(acoes(botao('go', 'começar →', ir)));
  [nome, turma].forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') ir(); }));
  abrirFolha(c);
}

function confirmarSaida(){
  const eraFolha = folha.classList.contains('show');
  if (eraFolha && S && S.fim){ sair(); return; }
  const guardado = eraFolha ? folha.firstChild : null;
  const classe = folha.className;
  const c = el('div', 'card');
  c.appendChild(el('div', 'eyebrow', 'Expedição Titanic'));
  c.appendChild(el('h2', '', 'Sair da missão?'));
  c.appendChild(el('p', '', 'Suas respostas ficam guardadas neste aparelho. Você pode continuar depois, do começo da etapa em que parou.'));
  c.appendChild(acoes(
    botao('ghost', 'sair e explorar livre', () => { sair(); }),
    botao('go', 'continuar na missão', () => {
      if (guardado){ folha.innerHTML = ''; folha.className = classe; folha.appendChild(guardado); }
      else fecharFolha();
    })
  ));
  folha.innerHTML = '';
  folha.className = 'show';
  folha.appendChild(c);
  document.body.classList.add('exp-sheet');
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
const btnMissao = document.getElementById('welcomeMission');

if (!fv){
  /* o motor não subiu: melhor esconder a missão do que oferecer um botão morto */
  if (btnMissao) btnMissao.style.display = 'none';
  const pitch = document.querySelector('#welcome .mission-pitch');
  if (pitch) pitch.style.display = 'none';
} else {
  painel.querySelector('#expQuit').addEventListener('click', confirmarSaida);

  if (btnMissao){
    if (S && S.fim) btnMissao.textContent = 'ver meu diário de bordo →';
    else if (S && S.passo > 0){
      const et = ROTEIRO[Math.min(S.passo, ROTEIRO.length - 1)].e + 1;
      btnMissao.textContent = 'continuar a missão (etapa ' + et + ' de ' + ETAPAS.length + ') →';
    }
    btnMissao.addEventListener('click', comecar);
  }

  /* tempo de missão = tempo com a missão ligada e a aba visível */
  let n = 0;
  setInterval(() => {
    if (!ativa || !S || S.fim || document.hidden) return;
    S.ativoMs = (S.ativoMs || 0) + 1000;
    if (++n % 10 === 0) salvar();
  }, 1000);
  window.addEventListener('pagehide', () => { if (S) salvar(); });

  /* gancho de teste, só com ?debug na URL */
  if (/[?&]debug\b/.test(location.search)){
    window.__exp = {
      estado: () => S, roteiro: ROTEIRO, comecar: comecar, sair: sair,
      pular: i => { ligar(); rodar(i); }
    };
  }
}
