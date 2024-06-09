import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GameComponent } from './components/game/game.component'

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
