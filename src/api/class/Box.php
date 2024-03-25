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
        $query = "SELECT * FROM box WHERE id=:id";
        $stmt = $this->conn->prepare($query);
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
        $query = ("SELECT * FROM box");
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()) {
            return $stmt;
        } else {
            return "Erreur lors de la requête SELECT ('SELECT * FROM box')";
        }
    }

    function getAliments() {
        $query = ("SELECT aliments.nom, quantité FROM boxaliments INNER JOIN aliments ON boxaliments.idAliment = aliments.id WHERE idBox=:id");
        $stmt = $this->conn->prepare($query);
        $options = [
            "id" => $this->id
        ];

        if($stmt->execute($options)) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $allAliments = [];
            $oneAliment = [];
            foreach($results as $res) {
                $oneAliment["nom"] = $res["nom"];
                $oneAliment["quantite"] = $res ["quantité"];
                array_push($allAliments, $oneAliment);
            }
            return $allAliments;
        } else {
            return "Erreur lors de la requête SELECT ('SELECT aliments.nom, quantité FROM boxaliments INNER JOIN aliments ON boxaliments.idAliment = aliments.id WHERE idBox=:id')";
        }
    }

    function getSaveur() {
        $query = "SELECT saveurs.nom FROM boxsaveurs INNER JOIN saveurs ON boxsaveurs.idSaveur = saveurs.id WHERE idBox=:id;";
        $stmt = $this->conn->prepare($query);
        $options = [
            "id" => $this->id
        ];

        if($stmt->execute($options)) {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $allSaveur = [];
            foreach($results as $res) {
                $allSaveur[] = $res["nom"];
            }
            return $allSaveur;
        } else {
            return "Erreur lors de la requête SELECT ('SELECT saveurs.nom FROM boxsaveurs INNER JOIN saveurs ON boxsaveurs.idSaveur = saveurs.id WHERE idBox=:id')";
        }
    }
}