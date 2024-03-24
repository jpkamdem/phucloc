import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './views/menu/menu.component';
import { InscriptionComponent } from './views/inscription/inscription.component';
import { CompteComponent } from './views/compte/compte.component';
import { PanierComponent } from './views/panier/panier.component';
import { ConnexionComponent } from './views/connexion/connexion.component';
import { DemarrageComponent } from './component/demarrage/demarrage.component';
import { BoxComponent } from './component/box/box.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    ConnexionComponent,
    MenuComponent,
    CompteComponent,
    DemarrageComponent,
    BoxComponent,
    PanierComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
