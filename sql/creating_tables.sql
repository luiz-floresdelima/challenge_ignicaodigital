CREATE TABLE clientes (id int(11) NOT NULL AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, tag_id int(11) NOT NULL,dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))

CREATE TABLE tags (id int(11) NOT NULL AUTO_INCREMENT, tag VARCHAR(100) NOT NULL, dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))