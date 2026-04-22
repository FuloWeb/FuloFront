# Project Template - Next.js + FSD

Template front-end escalável utilizando **Next.js**, **Feature-Sliced Design (FSD)**, **Tailwind CSS**, **Vitest** e componentes reutilizáveis com **shadcn/ui**.

---

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Vitest
- Zustand
- Storybook
- shadcn/ui

---

## Arquitetura

O projeto segue o padrão **Feature-Sliced Design (FSD)**, focado em escalabilidade, manutenção e separação clara de responsabilidades.

---

## Estrutura de Pastas

```bash
src/
├── app/
├── config/
├── entities/
├── features/
├── lib/
└── shared/
```

---

## Descrição das Pastas

### `app/`

Responsável pelas páginas e rotas da aplicação.

### `config/`

Centraliza configurações globais do projeto.

Pode conter:

- Scripts internos
- Providers
- Configurações contextuais
- Stores globais com Zustand

### `entities/`

Camada de entidades do domínio da aplicação.

Cada entidade pode possuir:

- `api/` → hooks e integrações CRUD
- `model/` → regras de negócio e tipagens
- `consts/` → constantes
- `ui/` → componentes específicos da entidade

### `features/`

Funcionalidades acionáveis pelo usuário.

Exemplos:

- login
- create-user
- update-profile
- delete-product

### `lib/`

Recursos reutilizáveis e genéricos do projeto.

Pode conter:

- Hooks genéricos
- Utilitários
- Helpers
- Tipos globais

### `shared/`

Camada compartilhada de interface e documentação.

Pode conter:

- Componentes base do shadcn/ui
- Widgets reutilizáveis
- Stories e documentação com Storybook

---

## Estilização

O projeto utiliza **Tailwind CSS**.

## Gerenciamento de Estado

Utiliza **Zustand**.

## Testes

O projeto utiliza **Vitest**.

```bash
pnpm run test
pnpm run test:watch
pnpm run coverage
```

---

