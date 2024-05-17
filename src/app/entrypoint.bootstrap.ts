import { bootstrap } from '@angular-architects/module-federation-tools'
import { OneCXAnnouncementModule } from './onecx-announcement-remote.module'
import { environment } from 'src/environments/environment'

bootstrap(OneCXAnnouncementModule, {
  production: environment.production
})
