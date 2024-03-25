<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "../config/Database.php";
require "../class/Box.php";

$database = new Database();
$db = $database->getConnection();

$box = new Box($db);
$ifExistId = isset($_GET["id"]);
if(!ifExistId) {
    $stmt = $box->getAllBoxes();
    $itemCount = $stmt->rowCount();
    if($itemCount > 0){
        $boxArr = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $box->id = $id;
            $aliments = $box->getAliments();
            $saveurs = $box->getSaveur();

            $e = [
                "id" => $id,
                "nom" => $nom,
                "pièces" => $pièces,
                "prix" => $prix,
                "image" => $image,
                "fav" => $fav,
                "stars" => $stars,
                "aliments" => $aliments,
                "saveurs" => $saveurs
            ];
            array_push($boxArr, $e);
        }
        echo json_encode($boxArr); 
    }else{
        http_response_code(404);
        echo json_encode(["message" => "Erreur dans le traitement."]);
    }
} else {
    $box->id = $_GET["id"];
    $stmt = $box->getBox();
    $itemCount = $stmt->rowCount();
    if($itemCount > 0){
        $boxArr = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $box->id = $id;
            $aliments = $box->getAliments();
            $saveurs = $box->getSaveur();

            $e = [
                "id" => $id,
                "nom" => $nom,
                "pièces" => $pièces,
                "prix" => $prix,
                "image" => $image,
                "aliments" => $aliments,
                "saveurs" => $saveurs
            ];
            array_push($boxArr, $e);
        }
        echo json_encode($boxArr);
    }
}

