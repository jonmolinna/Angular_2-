import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './store-signals-task/component/task/task.component';
import { CardsComponent } from './store-signals-get/components/cards/cards.component';
import { ProductsPageComponent } from './store-signals-crud/page/products-page/products-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent, CardsComponent, ProductsPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '1-signals-store';
}
