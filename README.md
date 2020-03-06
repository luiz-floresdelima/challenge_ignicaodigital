# Desafio - Ignição Digital

Desafio feito para o processo seletivo de Desenvolvedor Web para a Ignição Digital

## Setup

Foi utilizado XAMPP com APACHE + MYSQL, logo recomenda-se utilizá-los.

Executar o seguinte script(./sql/creating_tables.sql) no MySQL:
```
CREATE TABLE clientes (id int(11) NOT NULL AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, tag_id VARCHAR(100) NOT NULL,dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))

CREATE TABLE tags (id int(11) NOT NULL AUTO_INCREMENT, tag VARCHAR(100) NOT NULL, dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))
```

Alterar as configurações de banco(./config/Database.php):
```
private $host = 'localhost';
private $db_name = 'client';
private $username = 'root';
private $password = '';
```

Alterar o caminho da API no arquivo JavaScript do projeto(./front/main.js:1):
```
let urls = `http://localhost:8080/challenge_ignicaodigital/api/`;
```

Acessar o link do APACHE com a pasta (Ex.: http://localhost/challenge_ignicaodigital/front/)

## Funções

Pode-se criar Tags, criar clientes, listar clientes, editar clientes, deletar clientes e filtrar clientes.

## URLS do CRUD (clientes):
* ./challenge_ignicaodigital/api/clientes/create.php
* ./challenge_ignicaodigital/api/clientes/read.php
* ./challenge_ignicaodigital/api/clientes/update.php
* ./challenge_ignicaodigital/api/clientes/delete.php

## URLS funcionais:
* ./challenge_ignicaodigital/api/clientes/search.php - filtrar clientes
* ./challenge_ignicaodigital/api/tags/create.php - criar tags
* ./challenge_ignicaodigital/api/tags/read.php - listar tags
