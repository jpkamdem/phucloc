import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { HeaderService } from '../../services/header.service';
import { Subscription } from 'rxjs';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'cart',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit, OnDestroy{

  bagBoxes : any[] = [];
  totalPrix : number = 0;  
  subscription : Subscription
  noBoxFound: boolean = false;

  constructor(private router : Router, private nav : NavService, private header : HeaderService, private bag : PanierService) {
    this.subscription = this.bag.totalPrix.subscribe((value) => {
      this.totalPrix = value;
    })
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser == "") {
      this.router.navigate([`/app-connexion`]);
    }
    this.nav.changeActive("bag");
    this.header.greenBag(true);
    this.bag.checkNewBag();

    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let userID = 0;

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email == currentUser) {
        userID = i;
      }
    }
    
    if(allUsers[userID].hasOwnProperty("bagContent")) {
      this.bagBoxes = allUsers[userID].bagContent;
    } else {
      this.bagBoxes = [];
    }

    
    this.bag.calculTotal();
    this.checkBox();
  }

  ngOnDestroy(): void {
    this.header.greenBag(false);
  }

  suppBox(id : any) {

    for(let i = 0 ; i < this.bagBoxes.length; i++) {
      if(this.bagBoxes[i].itemID == id) {
        this.bagBoxes.splice(i, 1);
      }
    }
    
    let newCount: number = 0;
    for(let i = 0 ; i < this.bagBoxes.length; i++) {
      newCount += this.bagBoxes[i].quantity;
    }
    
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email == currentUser) {
        allUsers[i].bagContent = this.bagBoxes;
        allUsers[i].bag = newCount;
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }
    }

    this.bag.calculTotal();
    this.bag.checkNewBag();
    this.checkBox();
  }

  checkBox() {
    if(this.bagBoxes.length == 0) {
      this.noBoxFound = true;
    }
  }

  Commander() {
    let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let currentUser = localStorage.getItem("currentUser");
    let commandeNumber;

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email == currentUser) {
        if(allUsers[i].hasOwnProperty("historiqueLastNumber")) {
          allUsers[i].historiqueLastNumber = allUsers[i].historiqueLastNumber + 1
          commandeNumber = allUsers[i].historiqueLastNumber;
        } else {
          allUsers[i].historiqueLastNumber = 1;
          commandeNumber = allUsers[i].historiqueLastNumber;
        }
      }
    }


    let historiqueItem = {
      boxes : this.bagBoxes,
      price : this.totalPrix,
      commandeNumber : commandeNumber
    };


    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email == currentUser) {
        if(!allUsers[i].hasOwnProperty("historique")) {
          allUsers[i].historique = [];
          allUsers[i].historique.push(historiqueItem);
        } else {
          allUsers[i].historique.push(historiqueItem);
        }
        allUsers[i].bagContent = [];
        allUsers[i].bag = 0;

        localStorage.setItem("allUsers", JSON.stringify(allUsers));

        this.bag.checkNewBag();
        this.router.navigate([`/app-compte`])
      }
    }
  }
}
