# Your First DB App

Este é um projeto introdutório que demonstra o uso do IndexedDB em um aplicativo frontend. Ele ensina conceitos básicos de banco de dados e como usá-los para armazenar, consultar e limpar dados no navegador.

## Funcionalidades

- **Carregar Banco de Dados:** Preenche o banco de dados com um conjunto inicial de dados de clientes.
- **Consultar Banco de Dados:** Exibe todos os registros no banco de dados.
- **Limpar Banco de Dados:** Remove todos os registros do banco de dados.
- **Painéis Dinâmicos:**
  - Notificações: Exibe mensagens sobre as operações realizadas.
  - Logs: Mostra detalhes sobre as execuções.
  - Resultados: Exibe os dados das consultas realizadas.

## Tecnologias Utilizadas

- **HTML:** Estrutura da página.
- **CSS:** Estilização da interface.
- **JavaScript:** Lógica do aplicativo, incluindo o uso do IndexedDB.

## Pré-requisitos

- Navegador moderno com suporte ao IndexedDB (Chrome, Firefox, Edge, etc.).

## Como Usar

1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` em seu navegador.
3. Utilize os botões para interagir com o banco de dados:
   - **Load DB:** Popula o banco de dados com dados iniciais.
   - **Query DB:** Exibe todos os registros no painel de resultados.
   - **Clear DB:** Remove todos os registros do banco de dados.

## Estrutura do Projeto

- `index.html`: Contém a estrutura da interface.
- `style.css`: Estilização da interface (integrado no `<style>`).
- `script.js`: Script que implementa a lógica do IndexedDB (integrado no `<script>`).

## Expansões Futuras

- Adicionar mais campos aos dados dos clientes, como "Endereço" e "Telefone".
- Implementar filtros para as consultas.
- Fornecer suporte para exportação de dados do IndexedDB.

## Reflexão do Desenvolvedor

### Casos de Uso do IndexedDB
- Armazenar dados temporários entre sessões do navegador.
- Gerenciar estados ou cache no cliente para reduzir solicitações ao servidor.

### Vantagens e Desvantagens do IndexedDB
**Vantagens:**
- Persistência de dados entre sessões.
- Suporte para operações assíncronas e transações.
- Gerenciamento de grandes volumes de dados no cliente.

**Desvantagens:**
- Não recomendado para informações sensíveis (por ser acessível no cliente).
- API mais complexa em comparação com `localStorage` ou `sessionStorage`.

### Critérios para Uso do IndexedDB
- **Quando Usar:**
  - Necessidade de persistência local de dados.
  - Operações assíncronas e transações complexas.

- **Quando Evitar:**
  - Dados sensíveis ou confidenciais.
  - Aplicativos onde a simplicidade é prioridade.

