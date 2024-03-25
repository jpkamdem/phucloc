<?php
Class Box {
    public $id;
    private $conn;
    public $nom;
    public $fav;
    public $image;
    public $piece;
    public $prix;
    private $data_base;
    
    function __construct($db) {
        $this->conn = $db;
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
}