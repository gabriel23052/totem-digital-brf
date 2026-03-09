<div align="center">
  <img src="./docs/icon.svg" width="100" />

  <h1>Totem Digital BRF</h1>
 
  <p>Interface para totem digital interativo da BRF exposto na feira Expovizinhos 2023.</p>

[![Demonstração](https://img.shields.io/badge/Acessar-Demonstra%C3%A7%C3%A3o-da2228?logo=vercel&style=for-the-badge)](https://totem-digital-brf.vercel.app/) ![TypeScript](https://img.shields.io/badge/TypeScript-377cc8?style=for-the-badge&logo=typescript&logoColor=white)

  <img src="./docs/demo.gif" width="600">

</div>

<br />

Aplicação destinada a exibir um vídeo de processo industrial com atalhos para seções específicas, desenvolvida visando a utilização em totens digitais interativos com interface touchscreen. Devido a questões de confidencialidade, o vídeo original foi substituído por um placeholder na demonstração. Aplicação desenvolvida sob demanda para a BRF via agência. 

---

## Tecnologias Utilizadas

- HTML
- CSS
- TypeScript
- Vite

O projeto foi desenvolvido sem frameworks de forma intencional, priorizando desempenho e simplicidade dado o contexto de uso em totem digital.

---

## Arquitetura

A aplicação conta com uma interface de seleção para escolher qual parte do processo o usuário deseja assistir. Após selecionado, a aplicação exibe o vídeo já na parte correta.

### Fluxo

1. **Escolha da seção**
   O usuário toca na seção desejada.
2. **Exibição do vídeo**
   A aplicação posiciona o vídeo no início do clipe selecionado.
3. **Reprodução**
   A aplicação reproduz o vídeo até o final do clipe.
4. **Volta para seleção**
   A aplicação retorna para a interface de seleção após o fim do clipe ou após o usuário encerrar a reprodução manualmente.

### Parâmetros dos clipes

Cada clipe é representado por um objeto que define o seu nome, tempo inicial e tempo final.
Esses objetos servem como fonte da verdade tanto para reproduzir o clipe quanto para criar a lista na interface de seleção.

### Reprodução do vídeo

A aplicação utiliza a propriedade `currentTime` para posicionar o vídeo no tempo inicial do clipe, e para finalizar o clipe, verifica periodicamente o tempo de reprodução até atingir o tempo final.

### Feedback de carregamento

O player de vídeo exibe uma animação de carregamento caso o navegador ainda não tenha carregado o trecho do vídeo que será reproduzido. O controle desse sistema é feito por meio dos eventos disparados pelo vídeo.

### Exibição do vídeo

O vídeo permanece o tempo inteiro no DOM, sobre a interface de seleção, a exibição dele é controlada manipulando a opacidade do seu container, evitando modificar o DOM e causar possíveis problemas de desempenho.

---

## UI / UX

O design da aplicação foi desenvolvido previamente por terceiros e replicado em código com os refinamentos necessários para garantir a responsividade em diferentes resoluções.

A experiência de uso é focada em monitores touchscreen, consequentemente, são necessárias áreas de interação maiores em comparação com aplicações voltadas à utilização com mouse.

O fluxo de uso da aplicação é intuitivo e simplificado devido à natureza do ambiente no qual o totem seria exposto, uma feira agroindustrial, onde parte significativa do público teria idade mais avançada.

---

## Desafios Técnicos

### Refatoração para Web

A aplicação foi originalmente projetada para rodar localmente utilizando o Chrome no modo "kiosk".

Para disponibilizar a demonstração na web, o projeto foi refatorado, adicionando o Vite e o TypeScript, visando a manutenibilidade e simplificar a distribuição. Além disso, foi necessário alterar a abordagem de carregamento do vídeo, dado que efetuar o download via web demanda mais tempo do que carregar localmente.

Os diretórios e scripts foram revisados também, concatenando arquivos CSS curtos e substituindo variáveis globais por uma abordagem com módulos e classes, visando encapsular o comportamento, tornar a aplicação mais reutilizável e facilitar futuras atualizações.

### Prevenção de problemas

Devido à ausência de controle sobre quais usuários utilizariam o totem, poderiam ocorrer tentativas de fechar a aplicação, zoom do navegador, múltiplos toques simultâneos, etc. Devido a isso, a aplicação foi originalmente projetada para suprimir esses comportamentos, utilizando por exemplo as propriedades CSS `touch-action` e `user-select`, visando garantir que não fossem necessárias intervenções durante o período de uso.

---

## Possíveis Melhorias Futuras

- ### Implementar testes E2E

  Cobrir o fluxo de uso com testes E2E utilizando Cypress, verificando por exemplo se o clipe selecionado iniciou no tempo correto, se a aplicação retorna para interface automaticamente após o clipe finalizar, se o botão de encerrar o clipe funciona, etc.    

- ### Refinar animações

  Implementar animações mais voltadas ao movimento utilizando `@keyframes` de forma a mostrar com mais fluidez a mudança de contexto entre interface de seleção e vídeo.

- ### Recursos de acessibilidade

  Implementar recursos de acessibilidade tornaria o totem utilizável por mais pessoas, exemplos de recursos seriam audiodescrição para cegos e legenda para surdos.

---

## Como rodar o projeto localmente

```bash
git clone https://github.com/gabriel23052/totem-digital-brf.git
cd totem-digital-brf
npm install
npm run dev
```
