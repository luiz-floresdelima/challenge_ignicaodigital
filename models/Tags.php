<?php

class Tags
{
    private $conn;
    private $table = 'tags';

    public $id;
    public $tag;
    public $dt_criacao;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table}(tag)
            VALUES ('{$this->tag}')";

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function read()
    {
        $query = "SELECT t.id,t.tag
                FROM {$this->table} t
                ORDER BY t.dt_criacao ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function update()
    {
        $query = "UPDATE {$this->table}
            SET tag='{$this->tag}'
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
