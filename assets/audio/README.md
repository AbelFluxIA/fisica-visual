# Narração da introdução — `intro-narration.mp3`

Arquivo real, em produção (24/07/2026) — narração em inglês gerada por IA
pelo próprio usuário, com a trilha de Interstellar de fundo. Duração real:
143,9s (~2:24).

```html
<audio id="narration" src="assets/audio/intro-narration.mp3" preload="auto"></audio>
```

## Estrutura real do áudio (medida por análise de volume RMS, não estimada)

- **0–15s**: só a trilha instrumental (batida crescente), sem voz. A intro
  mostra o prompt "aumente o som" (0–13s) e depois "vire o celular" (13–16s)
  nessa janela.
- **~15,5–16s**: a voz entra (salto de volume medido de -28dB para -19dB).
- **15–132s**: narração completa, 21 falas transcritas e traduzidas (ver
  tabela abaixo).
- **132–144s**: cauda instrumental, sem fala — a intro entra na sequência de
  "acelerando entre as estrelas" (`#accelerateStage` em `/index.html`) até o
  botão "iniciar o voo" aparecer.

## Roteiro real (transcrito do áudio via Whisper, tempos em segundos desde o início do arquivo)

| Início | Fim | Inglês (narrado) | Português (legenda em produção) |
|---|---|---|---|
| 15,0 | 19,0 | Welcome to Space Exploration. | Bem-vindo à Exploração Espacial. |
| 19,0 | 22,0 | Are you ready to explore space? | Você está pronto para explorar o espaço? |
| 22,0 | 24,0 | I'm your guide. | Eu sou a sua Guia. |
| 24,0 | 29,0 | My purpose here is simple, to show you a little of the cosmos. | Meu propósito aqui é simples: mostrar a você um pouco do cosmo. |
| 29,0 | 33,0 | But before we begin, I need you to understand something. | Mas antes de começarmos, preciso que você entenda uma coisa. |
| 33,0 | 37,0 | Your beliefs, your religion, your politics. | Suas crenças, sua religião, sua política. |
| 37,0 | 45,0 | The things you defend with everything you have, that make you argue, that make you certain you're right. | As coisas que você defende com tudo o que tem, que te fazem discutir, que te fazem ter certeza de que está certo. |
| 45,0 | 54,0 | Everything you've ever lived, every joy, every pain, every decision that felt like the end of the world, | Tudo que você já viveu, cada alegria, cada dor, cada decisão que pareceu o fim do mundo, |
| 54,0 | 62,0 | happened on a grain of dust, suspended in a sunbeam, lost in a darkness with no end. | aconteceu num grão de poeira, suspenso num raio de sol, perdido numa escuridão sem fim. |
| 62,0 | 67,0 | Billions of stars, billions of possible worlds. | Bilhões de estrelas, bilhões de mundos possíveis. |
| 67,0 | 78,0 | And you, with everything you think, everything you believe, everything you are, are nothing more than a blink in the lifetime of the universe. | E você, com tudo o que pensa, tudo o que acredita, tudo o que é, não é mais que um piscar de olhos na vida do universo. |
| 78,0 | 86,0 | Against that, your certainties, your problems, your anguish, are nothing. | Diante disso, suas certezas, seus problemas, sua angústia, não são nada. |
| 86,0 | 88,0 | But there's an irony in that. | Mas há uma ironia nisso. |
| 88,0 | 98,0 | Because the very fact that we are this small, this brief, this improbable, and still capable of believing, of thinking, of doubting, of loving, | Porque o próprio fato de sermos tão pequenos, tão breves, tão improváveis, e ainda assim capazes de acreditar, de pensar, de duvidar, de amar, |
| 98,0 | 105,0 | makes us, in some way, the universe trying to understand itself through us. | nos faz, de alguma forma, o universo tentando entender a si mesmo através de nós. |
| 105,0 | 110,0 | You are not insignificant because you are small. | Você não é insignificante por ser pequeno. |
| 110,0 | 115,0 | You are extraordinary because you exist despite being small. | Você é extraordinário por existir, apesar de ser pequeno. |
| 115,0 | 118,0 | So hear this and never forget it. | Então ouça isto, e nunca esqueça. |
| 118,0 | 124,0 | You are special, unique, unrepeatable in the entire history of the cosmos. | Você é especial, único, irrepetível em toda a história do cosmo. |
| 124,0 | 128,0 | And it's time to take command of your own journey. | E é hora de assumir o comando da sua própria jornada. |
| 128,0 | 130,0 | Are you ready? | Você está pronto? |
| 130,0 | 132,0 | Then let's go. | Então vamos nessa. |

Esses são os valores exatos usados no array `CAPTIONS` de `/root/fisica-visual/index.html`.

## Como a sincronização funciona

O JavaScript da intro toca este arquivo assim que a página carrega. As
legendas sincronizam com o evento `timeupdate` do elemento `<audio>`, usando
as marcações `at`/`dur` (em segundos) do array `CAPTIONS`. Se o áudio falhar
ao carregar ou o autoplay for bloqueado, um temporizador em JavaScript assume
automaticamente e avança as legendas nos mesmos tempos — a intro funciona
(com legendas silenciosas) mesmo sem o arquivo.

**Não há botão de pular a intro** (removido a pedido do usuário — a trilha e
a narração são para serem ouvidas por completo todas as vezes). O único
caminho adiante é o botão "iniciar o voo", que só aparece quando a narração
termina (evento `ended` do áudio) ou, na sequência de aceleração, ao fim da
cauda instrumental.

## Se for regravar/trocar o áudio

1. Substitua `intro-narration.mp3` nesta pasta.
2. Se a nova narração tiver timing diferente, retranscreva (Whisper local
   já está instalado em `/tmp/whisperenv` neste ambiente — `whisper arquivo.mp3
   --model medium --language English --output_format json`) e ajuste os
   valores `at`/`dur` do array `CAPTIONS`, mais `VOLUME_PROMPT_UNTIL`,
   `ROTATE_PROMPT_FROM/UNTIL` e `ACCELERATE_FROM` em `/root/fisica-visual/index.html`
   para bater com a nova estrutura de silêncio→voz→cauda instrumental do
   áudio (meça com `ffmpeg -ss T -t 1 -i arquivo.mp3 -af volumedetect -f null -`
   em pontos candidatos para achar a transição real, não estime de ouvido).
