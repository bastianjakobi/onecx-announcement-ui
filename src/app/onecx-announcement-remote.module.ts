import { HttpClient, HttpClientModule } from '@angular/common/http'
import { DoBootstrap, Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { ActivatedRoute, RouterModule, Routes } from '@angular/router'
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core'

import {
  AppStateService,
  ConfigurationService,
  createTranslateLoader,
  PortalCoreModule,
  PortalMissingTranslationHandler
} from '@onecx/portal-integration-angular'
import { AppEntrypointComponent } from './app-entrypoint/app-entrypoint.component'
import { BrowserModule } from '@angular/platform-browser'
import { addInitializeModuleGuard } from '@onecx/angular-integration-interface'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./announcement/announcement.module').then((m) => m.AnnouncementModule)
  },
  {
    path: '**',
    loadChildren: () => import('./announcement/announcement.module').then((m) => m.AnnouncementModule)
  }
]
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    PortalCoreModule.forMicroFrontend(),
    RouterModule.forChild(addInitializeModuleGuard(routes)),
    TranslateModule.forRoot({
      isolate: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, AppStateService]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: PortalMissingTranslationHandler }
    })
  ],
  exports: [],
  providers: [ActivatedRoute, ConfigurationService],
  schemas: [],
  declarations: [AppEntrypointComponent]
})
export class OneCXAnnouncementModule implements DoBootstrap {
  constructor(private injector: Injector) {
    console.info('OneCX Announcement Module constructor')
  }

  ngDoBootstrap() {
    console.log('Bootstrapping app entrypoint of remote announcement app')
    const appEntrypoint = createCustomElement(AppEntrypointComponent, { injector: this.injector })
    customElements.define('ocx-announcement-app', appEntrypoint)
  }
}
