<?php
error_reporting(~E_NOTICE);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application-json');

include_once '../../config/Database.php';
include_once '../../models/Tags.php';

$database = new Database();
$db = $database->connect();

$tag = new Tags($db);

$result = $tag->read();

$qtd = $result->rowCount();

if ($qtd > 0) {
    $tag_arr = array();
    $tag_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $tag_item = array(
            'id' => $id,
            'tag' => $tag,
        );

        array_push($tag_arr['data'], $tag_item);
    }

    echo json_encode($tag_arr);
} else {
    echo json_encode(array('message' => 'Sem tags'));
}
