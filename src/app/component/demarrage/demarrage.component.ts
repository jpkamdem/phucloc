import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demarrage',
  templateUrl: './demarrage.component.html',
  styleUrl: './demarrage.component.css'
})
export class DemarrageComponent implements OnInit, OnDestroy {
  constructor (private headerService : HeaderService, private navService : NavService, private router : Router) {}

  accessUnknown() {
    let users = JSON.parse(localStorage.getItem("allUsers") || "[]");
    for(let i = 0; i < users.length; i++) {
      if(users[i].email == "unknown") {
        users.splice(i, 1);
      } 
    }
    let addUnknown = {
      email : "unknown",
    };
    users.push(addUnknown);
    localStorage.setItem("allUsers", JSON.stringify(users));

    let currentUser = localStorage.getItem("currentUser") || "";
    if (currentUser !== "") {
      currentUser = "unknown";
      localStorage.setItem("currentUser", currentUser);
    } else {
      currentUser = "unknown"
      localStorage.setItem("currentUser", currentUser);
    }

    this.router.navigate(["/app-accueil"]);
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser") || "";
    
    if(currentUser !== "") {
      this.router.navigate(["/app-accueil"]);
    }

    this.navService.changeActive("compte");
    this.headerService.hide();
    this.navService.hide();

  }

  ngOnDestroy(): void {
    this.headerService.display();
    this.navService.display();
  }
}
