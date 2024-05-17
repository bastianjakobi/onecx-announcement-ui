import { Component } from '@angular/core'

@Component({
  selector: 'app-app-entrypoint',
  templateUrl: './app-entrypoint.component.html'
})
export class AppEntrypointComponent {
  constructor() {
    console.log('Entrypoint component was rendered')
  }
}
