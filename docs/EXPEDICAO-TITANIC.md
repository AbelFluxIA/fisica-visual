# Expedição Titanic

Missão guiada dentro da sala do oceano (`/oceano/`). A criança pilota um submersível até o naufrágio e, no caminho, resolve desafios de matemática, ciências e leitura. No fim sai com um diário de bordo que o professor pode imprimir.

- **Público pensado:** 10 a 14 anos (5º ao 9º ano).
- **Duração:** cerca de 20 minutos.
- **Onde começa:** tela de boas-vindas de `/oceano/`, botão "começar a missão". O modo "explorar livre" continua existindo.

## As 5 etapas

| Etapa | O que acontece | Matéria |
|---|---|---|
| 1. Preparar a descida | Calcula o tempo de descida e a pressão no fundo | Matemática |
| 2. Descer pelas zonas | Desce por três zonas, registra três seres vivos e responde sobre cada um | Ciências |
| 3. O navio no fundo do mar | Chega pela proa, compara o tamanho do navio, descobre o que consome o casco | Matemática e Ciências |
| 4. Dentro do Titanic | Lê um telegrama real de aviso de gelo e um pedido de socorro, vê a escadaria em 1912, faz as contas dos botes | Leitura e História, Matemática |
| 5. Diário de bordo | Escreve o que viu e recebe o relatório | Escrita |

São 13 perguntas: 5 de matemática, 5 de ciências e 3 de leitura e história. Errar não bloqueia: a criança recebe uma dica e tenta de novo.

## O que o relatório mostra

- Acertos de primeira, por matéria.
- Pergunta por pergunta: de primeira ou em qual tentativa.
- Seres vivos registrados, tempo de missão e o texto do diário.
- Botões para imprimir ou salvar em PDF e para copiar o resumo.

Tudo fica guardado **só no aparelho do aluno** (localStorage). Nada é enviado pela internet e não existe login.

## Arquivos

- `oceano/expedicao.js` — o roteiro (lista `ROTEIRO`), as perguntas e o relatório. Para trocar uma pergunta, é só editar essa lista.
- `oceano/expedicao.css` — o visual da missão.
- `oceano/index.html` — o motor 3D. A missão conversa com ele pela ponte `window.__fv`.

## Fontes dos fatos

Conferidos em 19/11/2026 na Wikipedia em inglês, verbetes *Titanic*, *Sinking of the Titanic*, *Wreck of the Titanic* e *Lifeboats of the Titanic*:

- comprimento de 269 m; cerca de 2.200 pessoas a bordo; cerca de 1.500 mortos;
- 20 botes com 1.178 lugares (a regra da época exigia 16);
- afundou às 02h20, 2h40 depois de bater no iceberg;
- naufrágio a cerca de 3.800 m, encontrado em 1º/9/1985; proa e popa a cerca de 600 m uma da outra;
- aviso de gelo do navio Mesaba às 21h52, que não se sabe se chegou à ponte;
- velocidade de cerca de 22 nós (41 km/h); bactéria *Halomonas titanicae*.

Antes de levar a uma escola, vale um professor de História e um de Ciências revisarem as perguntas.

## O que mudou no motor junto com a missão

- **Celular e tablet:** controle redondo para mover, botões de subir e descer, e resolução que se ajusta sozinha quando o aparelho é fraco.
- **Luz no naufrágio:** luzes de expedição em volta do navio, para ele aparecer inteiro de longe. Acompanham o botão do farol.
- **Modo 1912:** agora é de dia, com o navio à tona no mar.
- **Correção:** o texto do ginásio dizia que o instrutor T. W. McCawley sobreviveu. A informação não foi confirmada em fonte e foi retirada.

## Pendências

- **Testar em aparelho de verdade.** Os testes foram num navegador sem placa de vídeo. Falta abrir num celular e num tablet comuns e ver se roda liso, principalmente o interior em 1912.
- **Modelo 3D do navio.** O casco continua desenhado por programação. O salto de realismo ("molde quase exato") depende de um modelo 3D pronto, comprado, licenciado ou encomendado.
- **Painel do professor.** Hoje o professor recolhe o relatório impresso ou em PDF, um por aluno. Reunir a turma numa tela só exige cadastro e servidor, e dados de criança precisam de orientação jurídica antes.
- **Espanhol.** Todo o texto está em português.
- **Revisão pedagógica** das perguntas por professores, e alinhamento com o currículo oficial.
- **Publicar.** As mudanças estão no ramo `expedicao-titanic`, só neste servidor. Falta acesso de escrita à conta AbelFluxIA para subir.
