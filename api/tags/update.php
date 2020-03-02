<?php
error_reporting(~E_NOTICE);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application-json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorizaion, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Tags.php';

$database = new Database();
$db = $database->connect();

$tag = new Tags($db);

$data = json_decode(file_get_contents("php://input"));

$tag->id = $data->id;
$tag->tag = $data->tag;

if ($tag->update()) {
    echo json_encode(
        array('messagem' => 'Tag atualizada')
    );
} else {
    echo json_encode(
        array('messagem' => 'Erro ao atualizar tag')
    );
}
