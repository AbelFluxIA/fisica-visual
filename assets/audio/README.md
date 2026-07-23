# Narração da introdução — `intro-narration.mp3`

Este diretório deve conter o arquivo de áudio da narração da tela de abertura
do site (`/index.html`), referenciado pelo elemento:

```html
<audio id="narration" src="assets/audio/intro-narration.mp3" preload="auto"></audio>
```

## O que gravar

- **Arquivo esperado:** `intro-narration.mp3` (nome e caminho exatos — o HTML já
  aponta para cá; se salvar com outro nome, atualize o `src` no `<audio>` de
  `/root/fisica-visual/index.html`).
- **Voz:** feminina.
- **Tom:** futurístico, impactante, mas contido — mais "voz de guia que já viu
  o suficiente do universo para não precisar gritar" do que "trailer de
  blockbuster". As legendas na tela já carregam o peso emocional; a narração
  deve reforçar, não competir.
- **Idioma da gravação:** inglês (ver roteiro em inglês abaixo). O site é em
  português e as legendas na tela permanecem em português — a narração em
  inglês toca por cima delas como uma camada estilística separada (como uma
  trilha narrada em documentário estrangeiro legendado). Se preferir gravar em
  português para ter locução e legenda no mesmo idioma, o roteiro em português
  abaixo já está pronto para isso também — é só usar essa versão como roteiro
  de gravação em vez da versão em inglês.
- **Ferramenta sugerida:** ElevenLabs ou qualquer TTS/gravação de voz
  equivalente.
- **Duração alvo:** cerca de 35 segundos no total, para bater com o
  temporizador de fallback do JS (`TOTAL_FALLBACK_DURATION` em `/index.html`).
  Se a narração real ficar com duração bem diferente, ajuste as marcações de
  tempo (`at`, em segundos) no array `CAPTIONS` do script da intro para
  ressincronizar cada legenda com o áudio.

## Como a sincronização funciona

O JavaScript da intro tenta tocar este arquivo assim que a página carrega. Se
o áudio existir e tocar normalmente, as legendas sincronizam com o evento
`timeupdate` do elemento `<audio>`, usando as marcações `at`/`dur` (em
segundos) definidas no array `CAPTIONS`. Se o áudio não existir, falhar ao
carregar, ou o autoplay for bloqueado pelo navegador, um temporizador em
JavaScript assume automaticamente e avança as legendas nos mesmos tempos
aproximados — a intro funciona (com legendas silenciosas) mesmo sem este
arquivo. Enquanto este README existir sem o mp3 ao lado, é esse modo de
fallback que está ativo em produção.

## Roteiro em português (texto exibido nas legendas da tela)

Este é o texto exato que aparece como legenda, na ordem, com o tempo alvo de
início (`at`) e duração de leitura (`dur`) usados hoje no código:

1. **[0,5s – 5,0s]** "Você está pronto para explorar o espaço?"
2. **[6,0s – 5,5s]** "Eu sou a sua Guia, e o meu objetivo aqui é mostrar um pouco do cosmo."
3. **[12,0s – 8,5s]** "Eu quero que você saia daqui com mais conhecimento, experiência — e principalmente, com a percepção de que diante da vastidão do universo, nossas opiniões, problemas e situações não são nada."
4. **[21,0s – 8,5s]** "Mas, ao mesmo tempo, de como você é único. E que privilégio é estar vivo, poder experimentar tudo isso, num universo tão grande e magnífico."
5. **[30,0s – 5,5s]** "Está pronto? Então vamos nessa."

## Roteiro em inglês (script for recording, if recording in English per the brief)

A natural-sounding English translation of the same script, preserving the
meaning and pacing intended above — use this as the recording script if
narrating in English over the Portuguese on-screen captions:

1. "Are you ready to explore space?"
2. "I'm your Guide, and my purpose here is to show you a little of the cosmos."
3. "I want you to leave here with more knowledge, more experience — and above all, with the realization that against the vastness of the universe, our opinions, our problems, our situations are nothing."
4. "But at the same time, how unique you are. And what a privilege it is to be alive — to be able to experience all of this, in a universe so vast and so magnificent."
5. "Are you ready? Then let's go."

## Depois de gravar

1. Salve o arquivo final como `intro-narration.mp3` nesta pasta
   (`/root/fisica-visual/assets/audio/intro-narration.mp3`).
2. Abra `/root/fisica-visual/index.html` e confirme que a narração toca e as
   legendas acompanham o áudio (não o temporizador de fallback).
3. Se a duração real da gravação divergir muito de ~35s, ajuste os valores
   `at`/`dur` no array `CAPTIONS` dentro do `<script>` da intro para
   realinhar cada legenda com o momento certo da fala.
