<?php
class Database {
    private $host = "mysql-jipekfll.alwaysdata.net";
    private $dbname = "jipekfll_phuc_bdd";
    private $user = "jipekfll_2";
    private $password = "crocodile123***";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->dbname, $this->user, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Database could not be connected :".$exception->getMessage();
        }
        return $this->conn;
    }
}