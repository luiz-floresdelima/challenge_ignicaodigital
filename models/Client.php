<?php

class Client
{
    private $conn;
    private $table = 'clientes';

    public $id;
    public $nome;
    public $email;
    public $tag_id;
    public $dt_criacao;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table}(nome,email,tag_id)
            VALUES ('{$this->nome}','{$this->email}','{$this->tag_id}')";

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function read()
    {
        $query = "SELECT c.id,c.nome,c.email,c.tag_id,t.tag,c.dt_criacao
                FROM {$this->table} c
                JOIN tags t ON c.tag_id = t.id
                ORDER BY c.dt_criacao ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function update()
    {
        $query = "UPDATE {$this->table}
            SET nome='{$this->nome}',email='{$this->email}',tag_id={$this->tag_id}
            WHERE id = '{$this->id}'";

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM {$this->table} 
                WHERE id = '{$this->id}'";

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}
