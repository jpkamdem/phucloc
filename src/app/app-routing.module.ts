import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './component/header/header.component';
import { BoxComponent } from './component/box/box.component';
import { DemarrageComponent } from './component/demarrage/demarrage.component';

import { ConnexionComponent } from './views/connexion/connexion.component';
import { InscriptionComponent } from './views/inscription/inscription.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { MenuComponent } from './views/menu/menu.component';
import { CompteComponent } from './views/compte/compte.component';
import { PanierComponent } from './views/panier/panier.component';
import { InfosComponent } from './views/infos/infos.component';

const routes: Routes = [
  { path: "app-header", component: HeaderComponent },
  { path: "app-menu", component: MenuComponent },
  { path: "app-box", component: BoxComponent},
  { path: "app-compte", component: CompteComponent },
  { path: "app-accueil", component: AccueilComponent },
  { path: "app-demarrage", component: DemarrageComponent },
  { path: "app-connexion", component: ConnexionComponent },
  { path: "app-inscription", component: InscriptionComponent },
  { path: "app-cart", component: PanierComponent },
  { path: "app-infos", component: InfosComponent },
  { path: "", redirectTo: "app-demarrage", pathMatch: 'full'},
  { path: "**", redirectTo: "app-connexion" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
