import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {

  historique : any = [];
  historiqueEmpty = true;

  constructor(private nav : NavService, private router : Router) {}

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser == "") {
      this.router.navigate([`/app-connexion`]);
    }
    this.nav.changeActive("compte");

    this.getHistorique();
  }

  getHistorique() {
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");

    let toRreverseHistorique
    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email = currentUser) {
        toRreverseHistorique = allUsers[i].historique;
      }
    }

    for(let i = toRreverseHistorique.length ; i !== 0; i--) {
      this.historique.push(toRreverseHistorique[i-1]);
    }

    if(this.historique.length > 0) {
      this.historiqueEmpty = false;
    } else {
      this.historiqueEmpty = true;
    }  
  }

  Annuler(id: number) {
    debugger
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email = currentUser) {
        if(allUsers[i].historique[id].commandeNumber == allUsers[i].historiqueLastNumber) {
          allUsers[i].historiqueLastNumber = allUsers[i].historiqueLastNumber - 1;
        }
        allUsers[i].historique.splice(id, 1);
      }
    }

    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    this.getHistorique();
  }

  disconnectUser(): void {
    localStorage.removeItem("currentUser");
    this.router.navigate([`/app-connexion`]);
  }
}
