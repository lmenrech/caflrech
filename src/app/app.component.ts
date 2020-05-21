import { Component } from '@angular/core';
import { CacheStore } from '../objects/CacheStore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caf-lrech';

  isLoading() {
    const loading = CacheStore.getObject('loading');
    return loading ? loading : false;
  }
}
