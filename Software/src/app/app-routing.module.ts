import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/cuenta/login/login.page';
import { TabComponent } from './componentes/tab/tab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/cuenta/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: '',
    component: TabComponent,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'presupuesto',
        loadChildren: () => import('./pages/presupuesto/presupuesto.module').then( m => m.PresupuestoPageModule)
      },
      {
        path: 'recetas',
        loadChildren: () => import('./pages/recetas/recetas.module').then( m => m.RecetasPageModule)
      },
      {
        path: 'ingredientes',
        loadChildren: () => import('./pages/ingredientes/ingredientes.module').then( m => m.IngredientesPageModule)
      },
    ]
  },
  {
    path: 'generar-presupuesto',
    loadChildren: () => import('./pages/generar-presupuesto/generar-presupuesto.module').then( m => m.GenerarPresupuestoPageModule)
  },
  {
    path: 'preferencias',
    loadChildren: () => import('./pages/preferencias/preferencias.module').then( m => m.PreferenciasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
