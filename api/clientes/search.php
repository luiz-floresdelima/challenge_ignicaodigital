<?php
error_reporting(~E_NOTICE);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application-json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

$data = json_decode(file_get_contents("php://input"));

$client->nome = $data->nome;
$client->email = $data->email;
$client->tag_id = (($data->tag == 0 )?"":$data->tag);

$result = $client->search();

$qtd = $result->rowCount();

if ($qtd > 0) {
    $client_arr = array();
    $client_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $client_item = array(
            'id' => $id,
            'nome' => $nome,
            'email' => $email,
            'tag' => $tag_id
        );

        array_push($client_arr['data'], $client_item);
    }

    echo json_encode($client_arr);
} else {
    echo json_encode(array('message' => 'Sem clientes'));
}