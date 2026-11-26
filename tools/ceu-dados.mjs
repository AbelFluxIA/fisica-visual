// Gera assets/data/ceu.js: o céu real usado no voo espacial.
//
//   node tools/ceu-dados.mjs <pasta com os arquivos do d3-celestial> assets/data/ceu.js
//
// Entrada (https://github.com/ofrohn/d3-celestial, pasta data/, licença BSD-3):
//   stars.6.json                 estrelas até magnitude 6 (catálogo XHIP / Hipparcos)
//   starnames.json               nomes próprios das estrelas
//   constellations.json          as 88 constelações e onde escrever o nome
//   constellations.lines.json    os traços que ligam as estrelas
//   constellations.bounds.json   limites oficiais (para achar as do zodíaco)
//
// Nada aqui é inventado: posição, brilho e cor vêm do catálogo. As
// constelações do zodíaco não estão escritas à mão, são calculadas: são
// aquelas cujos limites oficiais a eclíptica (o caminho do Sol) atravessa.
import fs from 'fs';
import path from 'path';

const [dir, out] = process.argv.slice(2);
const load = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).features;
const ra = (lon) => (lon < 0 ? lon + 360 : lon);
const q = (v) => Math.round(v * 100);

/* nomes em português, pela sigla oficial de três letras */
const PT = {
  And: 'Andrômeda', Ant: 'Máquina Pneumática', Aps: 'Ave-do-Paraíso', Aqr: 'Aquário', Aql: 'Águia', Ara: 'Altar',
  Ari: 'Áries', Aur: 'Cocheiro', Boo: 'Boieiro', Cae: 'Buril', Cam: 'Girafa', Cnc: 'Câncer', CVn: 'Cães de Caça',
  CMa: 'Cão Maior', CMi: 'Cão Menor', Cap: 'Capricórnio', Car: 'Quilha', Cas: 'Cassiopeia', Cen: 'Centauro',
  Cep: 'Cefeu', Cet: 'Baleia', Cha: 'Camaleão', Cir: 'Compasso', Col: 'Pomba', Com: 'Cabeleira de Berenice',
  CrA: 'Coroa Austral', CrB: 'Coroa Boreal', Crv: 'Corvo', Crt: 'Taça', Cru: 'Cruzeiro do Sul', Cyg: 'Cisne',
  Del: 'Golfinho', Dor: 'Dourado', Dra: 'Dragão', Equ: 'Cavalo Menor', Eri: 'Erídano', For: 'Fornalha',
  Gem: 'Gêmeos', Gru: 'Grou', Her: 'Hércules', Hor: 'Relógio', Hya: 'Hidra', Hyi: 'Hidra Macho', Ind: 'Índio',
  Lac: 'Lagarto', Leo: 'Leão', LMi: 'Leão Menor', Lep: 'Lebre', Lib: 'Libra', Lup: 'Lobo', Lyn: 'Lince',
  Lyr: 'Lira', Men: 'Mesa', Mic: 'Microscópio', Mon: 'Unicórnio', Mus: 'Mosca', Nor: 'Esquadro', Oct: 'Oitante',
  Oph: 'Ofiúco', Ori: 'Órion', Pav: 'Pavão', Peg: 'Pégaso', Per: 'Perseu', Phe: 'Fênix', Pic: 'Pintor',
  Psc: 'Peixes', PsA: 'Peixe Austral', Pup: 'Popa', Pyx: 'Bússola', Ret: 'Retículo', Sge: 'Flecha',
  Sgr: 'Sagitário', Sco: 'Escorpião', Scl: 'Escultor', Sct: 'Escudo', Ser: 'Serpente', Sex: 'Sextante',
  Tau: 'Touro', Tel: 'Telescópio', Tri: 'Triângulo', TrA: 'Triângulo Austral', Tuc: 'Tucano', UMa: 'Ursa Maior',
  UMi: 'Ursa Menor', Vel: 'Vela', Vir: 'Virgem', Vol: 'Peixe Voador', Vul: 'Raposa',
};
if (Object.keys(PT).length !== 88) throw new Error('esperava 88 constelações, há ' + Object.keys(PT).length);

/* ---- zodíaco: constelações que a eclíptica atravessa ---- */
const EPS = 23.4393 * Math.PI / 180;
function inside(lon, lat, ring) {
  let hit = false, prev = null;
  const pts = ring.map(([x, y]) => {
    let dx = x - lon; dx -= 360 * Math.round(dx / 360);
    if (prev !== null) { let step = dx - prev; step -= 360 * Math.round(step / 360); dx = prev + step; }
    prev = dx; return [dx, y];
  });
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > lat) !== (yj > lat) && 0 < (xj - xi) * (lat - yi) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}
const bounds = load('constellations.bounds.json');
const zod = new Map();
for (let l = 0; l < 360; l += 0.25) {
  const L = l * Math.PI / 180;
  const dec = Math.asin(Math.sin(EPS) * Math.sin(L)) * 180 / Math.PI;
  const lon = Math.atan2(Math.cos(EPS) * Math.sin(L), Math.cos(L)) * 180 / Math.PI;
  for (const b of bounds) if (inside(lon, dec, b.geometry.coordinates[0])) zod.set(b.id, (zod.get(b.id) || 0) + 0.25);
}

/* ---- constelações ---- */
const lines = new Map();
for (const f of load('constellations.lines.json')) {
  const arr = lines.get(f.id) || [];
  for (const seg of f.geometry.coordinates) arr.push(seg.flatMap(([x, y]) => [q(ra(x)), q(y)]));
  lines.set(f.id, arr);
}
const cons = [], seen = new Set();
for (const f of load('constellations.json')) {
  if (seen.has(f.id)) continue;          // a Serpente vem em duas partes; um nome só
  seen.add(f.id);
  if (!PT[f.id]) throw new Error('sem nome em português: ' + f.id);
  cons.push({ id: f.id, n: PT[f.id], la: f.properties.la || f.properties.name, r: Number(f.properties.rank),
    z: zod.has(f.id) ? 1 : 0, p: [q(ra(f.geometry.coordinates[0])), q(f.geometry.coordinates[1])], l: lines.get(f.id) || [] });
}

/* ---- estrelas ---- */
const names = JSON.parse(fs.readFileSync(path.join(dir, 'starnames.json'), 'utf8'));
const stars = load('stars.6.json').sort((a, b) => a.properties.mag - b.properties.mag);
const flat = [];
for (const s of stars) {
  const bv = s.properties.bv === '' ? 0.6 : Number(s.properties.bv);
  flat.push(q(ra(s.geometry.coordinates[0])), q(s.geometry.coordinates[1]), q(s.properties.mag), q(bv));
}
/* estrelas com nome na tela: as mais brilhantes e a Polar */
const RENAME = { 'Rigil Kentaurus': 'Alfa Centauri', Polaris: 'Polaris (Estrela Polar)' };
const famous = [];
for (const s of stars) {
  const nm = (names[String(s.id)] || {}).name;
  if (!nm) continue;
  if (s.properties.mag < 1.3 || nm === 'Polaris') {
    if (nm === 'Hadar' || nm === 'Mimosa') continue;   // coladas em Alfa Centauri e Acrux: só poluiriam
    famous.push([q(ra(s.geometry.coordinates[0])), q(s.geometry.coordinates[1]), RENAME[nm] || nm]);
  }
}

const data = {
  fonte: 'd3-celestial (Olaf Frohn, BSD-3): catálogo XHIP/Hipparcos, limites de Davenhall & Leggett (1989)',
  estrelas: flat,          // [ascensão reta, declinação, magnitude, cor B-V] x100, da mais brilhante à mais fraca
  nomes: famous,           // [ascensão reta, declinação, nome]
  constelacoes: cons,      // id, nome, latim, destaque 1-3, zodíaco, posição do nome, traços
};
fs.writeFileSync(out, '/* Céu real: gerado por tools/ceu-dados.mjs. Não editar à mão. */\nwindow.FV_CEU = ' + JSON.stringify(data) + ';\n');
console.log('estrelas', stars.length, '| com nome', famous.map((f) => f[2]).join(', '));
console.log('constelações', cons.length, '| zodíaco', cons.filter((c) => c.z).map((c) => `${c.n} (${zod.get(c.id)}°)`).join(', '));
console.log('arquivo', (fs.statSync(out).size / 1024).toFixed(0), 'KB');
