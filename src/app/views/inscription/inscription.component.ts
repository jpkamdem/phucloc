import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { HeaderService } from '../../services/header.service';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit, OnDestroy{
  constructor( private headerService : HeaderService, private navService : NavService, private form: FormBuilder, private router : Router ) {}

  inscriptForm = this.form.group({
    email: ["", [Validators.required, Validators.email]],
    motDePasse : ["", [Validators.required, Validators.minLength(8)]],
    cMotDePasse : ["", [Validators.required, Validators.minLength(8)]]
  });

  isSubmited = false;
  errorForm = true;
  emailErrorMessage = "";
  motDePasseErrorMessage = "";
  cMotDePasseErrorMessage = "";

  onSubmit() {
    this.isSubmited = true;
    this.checkError("motDePasse");
    this.checkError("cMotDePasse");
    this.checkError("email");

      if(!this.errorForm) {

        if(localStorage.getItem("allUsers") !== null) {
          let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

          let newUser = {
            email : this.inscriptForm.get("email")?.value,
            mdp : this.inscriptForm.get("motDePasse")?.value
          };

          allUsers.push(newUser);
          localStorage.setItem("allUsers", JSON.stringify(allUsers));

           let currentUser = localStorage.getItem("currentUser") || "";
           if (currentUser !== "") {
             currentUser = this.inscriptForm.get("email")?.value || "";
             console.log(currentUser);
             localStorage.setItem("currentUser", currentUser);
           } else {
             currentUser = this.inscriptForm.get("email")?.value || "";
             localStorage.setItem("currentUser", currentUser);
           }

          this.router.navigate(["/app-connexion"]);

        } else {
          
          let allUsers = [];

          let newUser = {
            email : this.inscriptForm.get("email")?.value,
            mdp : this.inscriptForm.get("motDePasse")?.value
          };

          allUsers.push(newUser);
          localStorage.setItem("allUsers", JSON.stringify(allUsers));

          let currentUser = localStorage.getItem("currentUser" || "");
          if (currentUser !== "") {
            currentUser = this.inscriptForm.get("email")?.value || "";
            localStorage.setItem("currentUser", currentUser);
          } else {
            currentUser = this.inscriptForm.get("email")?.value || "";
            localStorage.setItem("currentUser", currentUser);
          }

          this.router.navigate(["/app-connexion"]);
        }
    }
  }

  checkError(input: string) {
    const myInput = this.inscriptForm.get(input);
    switch (input) {
      case "email" :
        this.errorForm = false;
        if(myInput?.invalid && (myInput?.dirty || myInput?.touched || this.isSubmited)) {
          if(myInput?.errors?.["email"]) {
            this.emailErrorMessage = "Veuillez saisir un email correct";
          } else {
            this.emailErrorMessage = "Veuillez remplir ce champ";
          }
          this.errorForm = true;
          return "errorInput";
        } else {

          if(localStorage.getItem("allUsers") !== null && (myInput?.dirty || myInput?.touched || this.isSubmited)) {
            let allUser = JSON.parse(localStorage.getItem("allUsers") || "[]");
            allUser.forEach((user : any) => {
              if(user["email"] == myInput?.value) {
                this.emailErrorMessage = "Email déjà attribué";
                this.errorForm = true;
              }
            });
            if (this.errorForm) {
              return "errorInput";
            }
            this.emailErrorMessage = "";
            this.errorForm = false;
            return "noError";
          }
          this.emailErrorMessage = "";
          if(this.isSubmited) {
            this.errorForm = false;
          }
          return "noError";
        }      


      case "motDePasse" :
        if(myInput?.invalid && (myInput?.dirty || myInput?.touched ||this.isSubmited)) {
          if(myInput?.errors?.['minlength']) {
            this.motDePasseErrorMessage = "Au moins 8 caractères sont attendus";
          } else {
            this.motDePasseErrorMessage = "Veuillez remplir ce champ";
          }
          this.errorForm = true;
          return "errorInput";
        } else {
          this.motDePasseErrorMessage = "";
          if(this.isSubmited) {
            this.errorForm = false;
          }
          return "noError";
        }
      


      case "cMotDePasse" :
        if(myInput?.invalid && (myInput?.dirty || myInput?.touched ||this.isSubmited)) {
          if(myInput?.errors?.['minlength']){
            this.cMotDePasseErrorMessage = "Au moins 8 caractères sont attendus";
          } else {
            this.cMotDePasseErrorMessage = "Veuillez remplir ce champ";
          }
          this.errorForm = true;
          return "errorInput";
        } else {
            if (myInput?.value !== this.inscriptForm.get("motDePasse")?.value && this.inscriptForm.get("motDePasse")?.touched) {
              this.cMotDePasseErrorMessage = "Veuillez écrire le même mot de passe";
              this.errorForm = true;
              return "errorInput";
            } else {
              this.cMotDePasseErrorMessage = "";
              if(this.isSubmited) {
                this.errorForm = false;
              } 
              return "noError";
            }
          } 
        }
    return "noError";
    }
      
  ngOnInit(): void {
    this.headerService.hide();
    this.navService.hide();
  }  

  ngOnDestroy(): void {
    this.headerService.display();
    this.navService.display();
  }
}
