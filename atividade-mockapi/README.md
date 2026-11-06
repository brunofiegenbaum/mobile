# Atividade MockAPI - Meus Livros

Aplicativo de cadastro e listagem de livros com React Native, **Expo SDK 58**, Expo Router e MockAPI, seguindo o estilo da aula 14 do professor Mateus Roveda.

## Recurso no MockAPI

1. Entre em https://mockapi.io e faça login com sua própria conta.
2. Crie um projeto (o prefixo pode ser `/api/v1`).
3. Crie **um recurso** chamado `livros`.
4. Remova os campos de exemplo `name` e `avatar`. Crie exatamente estes cinco campos personalizados, todos do tipo **String**:

| Campo | Exemplo |
| --- | --- |
| titulo | Dom Casmurro |
| autor | Machado de Assis |
| genero | Romance |
| ano | 1899 |
| editora | Garnier |

O MockAPI cria `id` e `createdAt` automaticamente; não é necessário criá-los entre os cinco campos.

5. Copie a URL completa do recurso, por exemplo `https://SEU-PROJETO.mockapi.io/api/v1/livros`.
6. Abra `src/app/index.js` e substitua `COLE_AQUI_A_URL_DO_MOCKAPI` pela URL real.
7. Abra a URL no navegador para conferir a resposta JSON.

## Executar com Expo SDK 58

É necessário **Node.js 22.13 ou superior**. Abra o terminal dentro da pasta do projeto:

```bash
cd atividade-mockapi
npm install
npx expo install --fix
npx expo-doctor@latest
npx expo start --tunnel --clear
```

O SDK 58 possui um túnel novo que não depende da instalação global de `@expo/ngrok`. No iPhone, use um Expo Go compatível com SDK 58. Se você já tinha instalado as dependências antigas localmente, remova a pasta `node_modules` **dentro de atividade-mockapi** e execute `npm install` novamente.

O projeto usa Expo Go no celular ou Expo Web. É necessário ter acesso à internet.

## Funcionamento

- **GET**: `carregar()` busca os livros e exibe os resultados em uma `FlatList`. É chamado no `useEffect` ao abrir.
- **POST**: `salvar()` envia os cinco campos com `fetch`, `method: "POST"`, `headers` e `JSON.stringify`.
- Após salvar, `carregar()` atualiza a lista.
- O formulário exige os cinco campos preenchidos.

Referências:
- https://github.com/mateusrovedaa/aulas-mobile-tecnico-2026B/tree/main/14-aula
- https://roveda.dev/materiais/api
- https://expo.dev/changelog/sdk-58

**Observação:** a conta e o recurso do MockAPI precisam ser criados pelo aluno. O aplicativo está preparado, mas o GET e o POST só poderão ser testados depois que a URL real for configurada.

## Aula 15 - Editar e excluir

O aplicativo segue a estrutura de `hamburgueria.js` da aula 15 do professor, adaptada para os cinco campos de livros.

- GET `/Livros`: lista os livros.
- POST `/Livros`: cadastra um livro.
- PUT `/Livros/:id`: edita o livro selecionado. O botão Editar preenche o formulário; Salvar edição envia o PUT.
- DELETE `/Livros/:id`: exclui um livro.
- Os botões Editar e Excluir ficam ao lado das informações de cada livro.

Referência: https://github.com/mateusrovedaa/aulas-mobile-tecnico-2026B/tree/main/15-aula0611
