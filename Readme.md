# Projeto Lista de Tarefas

## Iniciando BackEnd

### Requisitos Mínimos

- Composer v2.8.4 ou mais
- PHP v8.2.12 ou mais
- SQLite instalado

### Primeiros Passos

- Faça o clone da aplicação no GitHub;
- Dentro da pasta da aplicação `projeto-tarefas`:
    - Rode o comando: 
        > composer install
    - Rode o comando:
        > cp .env.example .env
    - Rode o comando:
        > php artisan key:generate
    - Rode o comando:
        > php artisan migrate
    - Rode o comando:
        > php artisan db:seed --class=SeedAdmin
    - Rode o comando:
        > php artisan serve
- Note que o banco de dados configurado foi o SQLite para fins de testes e simplificação.

### Observações:

- A aplicação deve rodar na porta 8000 do localhost, caso contrário, as requisições do front-end não irão funcionar.

## Iniciando FrontEnd

### Requisitos Mínimos

- Angular v19.0.6 ou mais
- Node v22.11.0 ou mais
- NPM v10.9.0 ou mais

### Primeiros Passos

- Faça o clone da aplicação no GitHub;
- Dentro da pasta da aplicação `projeto-tarefas-angular`:
    - Rode o comando:
        > npm install
    - Rode o comando:
        > ng serve

## Utilizando a aplicação:

### Modo Admin:

- A aplicação vem com um usuário `admin` cadastrado:
    ```json
        {
            "email": "admin@admin.com",
            "password": "admin"
        }
    ```
- Para acessar como administrador, no seu login inicial, entre com as informações de `admin`.
- Ao acessar o sistema, poderá criar, editar, visualizar e excluir projetos.
- Dentro de cada projeto, terá acesso as tarefas daquele projeto.
- Caso seja o responsável pelo projeto acessado (dono), terá permissões de criar, editar e excluir.
- Na página principal (Lista de projetos), terá a opção de fazer `logout` ou editar permissões.
- Na página de edição de permissões, terá acesso a todos usuários e suas respectivas permissões, podendo alterar elas para `user` (padrão de criação de usuário) ou `admin` (podendo ser cedido inicialmente apenas pelo administrador inicial e, após novos administradores serem criados, por estes também)

### Modo User:

- Caso queira acessar a aplicação como um usuário comum, quando for inicialmente direcionado para pagina de `login`, selecione a opção de registrar.
- Na pagina de cadastro, insira seus dados e se registre.
- Após o registro, realize o login.
- Uma vez logado, terá acesso aos projetos já criados pelo admin.
- Dentro dos projetos criados pelo admin, terá acesso as tarefas.