<?php
Class Box {
    private $conn;
    private $data_base;
    public $id;
    public $nom;
    public $piece;
    public $prix;
    public $image;

    public $fav;

    function __construct($db) {
        $this->conn = $db;
    }

    function getBox() {
        $sqlQuery = "SELECT * FROM box WHERE id=:id";
        $stmt = $this->conn->prepare($sqlQuery);
        $options = [
            "id" => $this->id
        ];
        if($stmt->execute($options)) {
            return $stmt;
        } else {
            return "Erreur base de donnée";
        }
    }

    function getAllBoxes() {
        $sqlQuery = "SELECT * FROM box";
        $stmt = $this->conn->prepare($sqlQuery);
        if($stmt->execute()) {
            return $stmt;
        } else {
            return "Erreur base de donnée";
        }
    }

    function getAliments() {
        $sqlQuery = "SELECT aliments.nom, quantité FROM boxaliments INNER JOIN aliments ON boxaliments.idAliment = aliments.id WHERE idBox=:id;";
        $stmt = $this->conn->prepare($sqlQuery);
        $options = [
            "id" => $this->id
        ];

        if($stmt->execute($options)) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $allAliments = [];
            $oneAliment = [];
            foreach($results as $result) {
                $oneAliment["nom"] = $result["nom"];
                $oneAliment["quantite"] = $result ["quantité"];
                array_push($allAliments, $oneAliment);
            }
            return $allAliments;
        } else {
            return "Erreur base de donnée";
        }
    }

    function getSaveur() {
        $sqlQuery = "SELECT saveurs.nom FROM boxsaveurs INNER JOIN saveurs ON boxsaveurs.idSaveur = saveurs.id WHERE idBox=:id;";
        $stmt = $this->conn->prepare($sqlQuery);
        $options = [
            "id" => $this->id
        ];

        if($stmt->execute($options)) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $allSaveur = [];
            foreach($results as $result) {
                $allSaveur[] = $result["nom"];
            }
            return $allSaveur;
        } else {
            return "Erreur base de donnée";
        }
    }
}