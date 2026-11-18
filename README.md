# Lista de Tarefas — Next.js 15 + Testes Unitários

Atividade prática de **Next.js 15 (App Router)**, **TypeScript**, **Jest** e **React Testing Library**.

O aplicativo apresenta três tarefas vindas de um arquivo local que simula uma API, permite adicionar tarefas por meio de um formulário controlado e mostra um contador calculado por um hook personalizado.

## Tecnologias

- Next.js **15** com App Router e React 19
- TypeScript
- Jest e React Testing Library
- CSS responsivo (sem dependências adicionais de UI)

## Requisitos

- Node.js **20.9+** (recomendado **22**)
- npm instalado

## Como executar

```bash
npm install
npm run dev
```

Acesse **http://localhost:3000**.

## Como executar os testes

```bash
npm test                 # suíte completa
npm run test:watch       # acompanha mudanças
npm run test:coverage    # gera relatório de cobertura em coverage/
npm run typecheck        # verifica tipos do TypeScript
npm run build            # compila para produção
```

## Estrutura principal

```text
app/
  page.tsx                 # Server Component assíncrono: carrega tarefas
  layout.tsx               # layout global
  globals.css              # estilo responsivo
components/
  NovaTarefa.tsx           # Client Component + formulário controlado
  PainelDeTarefas.tsx      # Client Component + estado/lista
hooks/
  useContadorDeTarefas.ts  # hook personalizado
lib/
  tarefas.ts               # dados locais simulando API (Promise.resolve)
types/
  tarefa.ts                # interface TypeScript
__tests__/
  NovaTarefa.test.tsx      # validação, botão, submissão
  PainelDeTarefas.test.tsx # listagem, contador, inclusão e estado vazio
  useContadorDeTarefas.test.ts # renderHook e rerender
  page.test.tsx            # renderização após carregamento local
  tarefas.test.ts          # carregamento e isolamento dos dados
.github/workflows/
  testes.yml               # CI de teste, tipos e build
```

> No **App Router**, usamos `app/` no lugar de `pages/`. Adicionar `pages/` apenas para cumprir uma lista de diretórios seria desnecessário e poderia confundir o roteamento.

## O que cada teste verifica

| Arquivo | Fluxos verificados |
| --- | --- |
| `NovaTarefa.test.tsx` | Input controlado, botão, validação, submissão e limpeza |
| `useContadorDeTarefas.test.ts` | Contagem da lista vazia e atualizações com `rerender` |
| `PainelDeTarefas.test.tsx` | Lista inicial, contador, inclusão e mensagem de lista vazia |
| `page.test.tsx` | Carregamento do Server Component e renderização das tarefas simuladas |
| `tarefas.test.ts` | Promessa com dados locais e retorno de cópias independentes |

### Observação sobre Server Components assíncronos

O **Jest não oferece suporte completo à renderização de Server Components assíncronos**. Por isso, `page.test.tsx` chama `await Page()` e testa o **elemento React que a função retorna** (sem mock de API externa). Isso valida os dados exibidos, mas **não equivale a um teste de integração do runtime do Next.js**. Em uma aplicação de produção, complemente com E2E (por exemplo, Playwright ou Cypress) para exercitar o fluxo de servidor no navegador.

Referência: [Guia oficial de testes com Jest no Next.js](https://nextjs.org/docs/15/app/guides/testing/jest).

## Limitação intencional

Os dados ficam em memória e são reiniciados ao atualizar a página. Não há banco de dados nem API remota. Isso atende ao objetivo da atividade de isolar componentes e lógica de testes.

## Como publicar no GitHub

1. Crie um repositório público **`next15-lista-tarefas-testes`** no GitHub (sem README inicial, pois este projeto já possui um).
2. Na pasta do projeto, execute os comandos abaixo, substituindo `SEU_USUARIO`:

```bash
git init
git add .
git commit -m "feat: tarefas com testes Jest e Testing Library"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/next15-lista-tarefas-testes.git
git push -u origin main
```

3. Entregue na plataforma o link do repositório criado.

Se você usa a CLI do GitHub (`gh`), após `git init`, `git add .` e `git commit`, também pode criar e enviar o repositório com:

```bash
gh auth login
gh repo create next15-lista-tarefas-testes --public --source=. --remote=origin --push
```

## Segurança das dependências (novembro de 2026)

- A versão de Next.js é fixada em `15.5.29`, ainda na linha 15 exigida pela atividade.
- A entrada `overrides.postcss` fixa `8.5.33`, acima da versão vulnerável (`<= 8.5.22`) apontada pelo `npm audit`, sem migrar para Next.js 16. O override é de dependência transitiva e **precisa ser verificado após a instalação**.
- Existe um alerta recente de ReDoS em `picomatch` (GHSA-fc5q-39xc-vjpf), utilizado na árvore de dependências dos testes Jest. A base oficial de avisos do GitHub ainda não anuncia uma versão corrigida em 18/11/2026. Por isso, alguns alertas podem persistir após atualizar o PostCSS; não indicam necessariamente dezenas de falhas independentes.
- Execute `npm install`, `npm ls postcss next`, `npm audit`, `npm audit --omit=dev`, `npm test`, `npm run typecheck` e `npm run build` para verificar no seu ambiente.
- **Não execute `npm audit fix --force`**: isso pode migrar Next.js para a versão 16, contrariando os requisitos do exercício. Não suprima alertas sem avaliação de risco.
- No aplicativo educacional, nenhum usuário fornece padrões de busca glob/extglob à ferramenta Jest; isso reduz a exposição prática do alerta específico do picomatch. Não equivale a uma correção da dependência.

Referências: [PostCSS GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) e [picomatch GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf).

## Licença

Projeto educacional para estudo de testes unitários em Next.js.
