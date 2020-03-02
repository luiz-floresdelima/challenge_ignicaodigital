<?php
error_reporting(~E_NOTICE);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application-json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorizaion, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

$data = json_decode(file_get_contents("php://input"));

$client->id = $data->id;
$client->nome = $data->nome;
$client->email = $data->email;
$client->tag_id = $data->tag;

if ($client->update()) {
    echo json_encode(
        array('messagem' => 'Cliente atualizado')
    );
} else {
    echo json_encode(
        array('messagem' => 'Erro ao atualizar cliente')
    );
}
