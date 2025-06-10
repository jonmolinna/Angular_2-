import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './store-signals-task/component/task/task.component';
import { CardsComponent } from './store-signals-get/components/cards/cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent, CardsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '1-signals-store';
}
