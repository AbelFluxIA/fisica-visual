# Voo espacial: visual, dobra e mistérios

Mudanças feitas em `/voo/` em 20/11/2026 (ramo `universo-bonito`).

## Visual

- **Sol:** superfície que se mexe, borda mais escura que o centro (efeito real) e coroa com raios.
- **Céu:** a imagem real da Via Láctea em volta da câmera, com estrelas nítidas por cima. Antes o sistema solar ficava num fundo preto.
- **Planetas:** linha de dia e noite suave, atmosfera na borda (cor própria de cada planeta), luzes das cidades da Terra só no lado da noite e reflexo do Sol no oceano.
- **Saturno:** anéis em círculos (antes saíam como raios), no plano do equador, com a sombra do planeta nos anéis e dos anéis no planeta.
- **Chegada:** toda viagem termina no lado iluminado do planeta. Antes costumava parar no lado da noite.
- **Eixo dos planetas:** parou de balançar. O eixo inclinado girava em círculo a cada volta do planeta.
- **Celular:** resolução inicial menor em aparelho fraco, e ajuste automático se a imagem engasgar.

## Objetos novos

Cometa (com duas caudas que crescem perto do Sol e apontam para longe dele), cinturão de asteroides, Estação Espacial em volta da Terra e a sonda Voyager 1 além de Netuno. Todos são pontos normais do mapa: têm marcador, viagem, órbita e aparecem no radar.

## Dobra espacial

Viagens longas mostram estrelas esticadas, campo de visão mais aberto e bordas azuis. Na tela aparece sempre "dobra espacial · recurso de ficção científica". Na chegada a um planeta, um aviso diz quanto tempo a luz do Sol leva até ali.

## Mistérios

Seis perguntas, cada uma no lugar onde a resposta pode ser vista: Sol, cometa, cinturão, Estação Espacial, Voyager 1 e a própria dobra (liberada depois da primeira viagem longa). O botão "mistérios" fica no painel do radar e no painel de órbita. O progresso fica só no aparelho.

As perguntas estão na lista `MISTERIOS`, em `voo/index.html`.

## Céu real e constelações (21/11/2026)

- **Estrelas:** as cerca de 5 mil visíveis a olho nu, cada uma na posição, no brilho e na cor do catálogo. Antes eram sorteadas.
- **Via Láctea:** a foto de fundo foi girada para a posição certa. O centro da galáxia cai em Sagitário, com erro menor que 0,1 grau.
- **Constelações:** botão "constelações" no radar e no painel de órbita, ou tecla C. Mostra os traços e os nomes em português das 88 constelações, e o nome de 19 estrelas famosas. Começa desligado; o aparelho lembra a escolha.
- **Zodíaco em dourado:** as 13 constelações que o caminho do Sol atravessa. A lista é calculada a partir dos limites oficiais, não foi digitada.
- **Eixo dos planetas:** fica parado no espaço durante a órbita. Antes o polo norte ficava virado para o Sol o ano inteiro. O da Terra aponta a 0,7 grau da Estrela Polar, que é o valor real.
- **Mistério novo:** "A faixa dos planetas", liberado ao ligar as constelações. Agora são sete.

Arquivos: `assets/data/ceu.js` (gerado por `tools/ceu-dados.mjs`; não editar à mão) e `assets/data/LICENSE-d3-celestial.txt`.

Dados: projeto d3-celestial, de Olaf Frohn, licença BSD de 3 cláusulas (permite uso comercial; exige manter o aviso de licença, que está na pasta e no painel "entenda a física"). O catálogo de origem é o XHIP/Hipparcos.

O OpenSpace (programa de planetário, licença MIT) serve de referência de conteúdo. Os dados de estrelas e galáxias dele vêm do museu AMNH, com licença própria ("AMNH Digital Universe") que não foi lida: nada dele foi copiado.

## Fontes dos fatos

Conferidos em 20/11/2026:

- NASA, *Comets* e *Comets: Facts*: duas caudas (poeira e gás), empurradas para longe do Sol pela luz e pelo vento solar, com milhões de quilômetros.
- NASA, *Asteroids: Facts*: massa total dos asteroides menor que a da Lua; Vesta, o maior, com cerca de 530 km.
- NASA, *Voyager 1*: lançada em 5/9/1977, no espaço interestelar desde agosto de 2012, objeto humano mais distante (mais de 16 bilhões de milhas), quatro instrumentos funcionando.
- NASA Glenn, *What is microgravity?*: gravidade de 88,8% a cerca de 250 milhas de altura; 28.000 km/h; queda livre contínua.
- Wikipedia, *Alcubierre drive*: proposta de 1994, exige energia negativa, continua hipotética.
- A conta dos 8 minutos e 20 segundos da luz do Sol é 150 milhões de km dividido por 300 mil km/s.

- NASA Space Place, *What are constellations?*: 88 constelações oficiais; estrelas de uma mesma constelação a distâncias diferentes.
- NASA StarChild, pergunta 64: o eixo da Terra aponta quase exatamente para Polaris.
- NASA (Tumblr oficial, 20/9/2016), *Constellations and the Calendar*: o Sol passa por 13 constelações; Ofiúco ficou de fora dos signos.
- Wikipedia, *Ecliptic* e *Zodiac*: planetas quase no mesmo plano, por isso perto da eclíptica; inclinação de 23,4 graus.

O que não é real está escrito no painel "entenda a física": luz igual para todos os planetas, dobra, órbita do cometa, quantidade de rochas do cinturão e tamanho e distância da Estação e da Voyager.

## Pendências

- **Ver em aparelho de verdade.** Os testes foram num navegador sem placa de vídeo, a 1 ou 2 quadros por segundo. A dobra em movimento só foi vista em foto parada.
- **Tela limpa ("modo cinema")** para esconder os painéis: não foi feito.
- **Galáxias e nebulosas** continuam desenhos estilizados.
- **Nomes das constelações em português:** tradução nossa, falta um professor conferir.
- **Galáxias reais:** exigem ler a licença do museu AMNH ou achar outro catálogo aberto.
- **Direção do eixo** dos outros planetas é ilustrativa; só a da Terra é a real.
- **Revisão** das perguntas por um professor de Ciências.
