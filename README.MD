# Sistema de Controle de Tarefas

Um sistema web moderno e minimalista para gerenciamento de tarefas, construído com **React**, **TypeScript**, **Firebase** (Auth + Firestore) e **TailwindCSS**. Permite criar, completar, deletar tarefas, além de visualizar histórico e gráficos de desempenho.

---

## Funcionalidades

- **Autenticação**
  - Login com email/senha.
  - Login com Google.
  - Logout.

- **Tarefas**
  - Criar novas tarefas com título, categoria e prioridade.
  - Marcar tarefas como concluídas.
  - Deletar tarefas (soft delete com histórico).

- **Histórico e Estatísticas**
  - Visualização de histórico de tarefas concluídas e deletadas.
  - Gráficos de desempenho com **Recharts**.

- **Perfil do Usuário**
  - Visualizar e editar informações do perfil.

---

## Tecnologias Utilizadas

- **Frontend:** React + TypeScript
- **Estilização:** CSS básico
- **Backend:** Firebase (Auth, Firestore)
- **Bibliotecas auxiliares:**
  - `react-router-dom` → Navegação entre páginas
  - `recharts` → Gráficos e estatísticas
  - `firebase` → Autenticação e banco de dados
  - `date-fns` → Manipulação de datas

---

## Estrutura de Pastas

```

src/
│
├─ api/                 # Funções de integração com Firebase (CRUD)
│   └─ firestore.ts
│
├─ components/          # Componentes reutilizáveis
│   ├─ TaskForm.tsx
│   ├─ TaskList.tsx
│   ├─ TaskCard.tsx
│   └─ ProfileForm.tsx
│
├─ hooks/               # Hooks personalizados
│   ├─ useAuth.ts
│   ├─ useTasks.ts
│   └─ useHistory.ts
│
├─ pages/               # Páginas do sistema
│   ├─ Login.tsx
│   ├─ Tasks.tsx
│   ├─ Profile.tsx
│   ├─ ProfileEdit.tsx
│   └─ History.tsx
│
├─ services/            # Configurações de Firebase
│   └─ firebase.ts
│
├─ styles/              # CSS global e componentes
│   └─ global.css
│
├─ types/               # Tipagens TypeScript
│   └─ task.ts
│
├─ App.tsx              # Roteamento principal
└─ main.tsx             # Entry point do React

````

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/controle-de-tarefas.git
cd controle-de-tarefas
````

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure o Firebase:

* Crie um projeto no [Firebase](https://console.firebase.google.com/)
* Habilite **Authentication** (Email/Google)
* Habilite **Firestore Database**
* Copie as credenciais para `src/services/firebase.ts`

```ts

// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
```

---

## Execução

Para rodar o projeto localmente:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em: `http://localhost:5173` (Vite default)

----

## Estilo e Design

* Design moderno e minimalista
* Tipografia: **Plus Jakarta Sans**
* Inputs, selects, botões e badges estilizados
* Responsivo para telas de desktop

---

## Possíveis Melhorias Futuras

* Filtros por categoria e prioridade
* Notificações e lembretes
* Exportar tarefas em PDF ou CSV
* Dark mode

---

## Autor

* **Ana Souza**
* GitHub: https://github.com/anacostasouza
* Email: anamariacostasouza93@gmail.com

