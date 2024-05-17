import { createCustomElement } from '@angular/elements'
import { createApplication } from '@angular/platform-browser'
import { AnnouncementBannerComponent } from '@onecx/portal-integration-angular'
;(async () => {
  const app = await createApplication({
    providers: []
  })

  const announcementBanner = createCustomElement(AnnouncementBannerComponent, {
    injector: app.injector
  })

  customElements.define('ocx-announcement-banner', announcementBanner)
})()
