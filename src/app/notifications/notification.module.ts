import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NotificationResolverService } from './notification-resolver.service';
import { PwaService } from './services/pwa.service';

@NgModule({
  imports: [],
  providers: [
    NotificationResolverService,
    {
      provide: APP_INITIALIZER,
      useFactory: (pwaService: PwaService) => () => pwaService.initPwaPrompt(),
      deps: [PwaService],
      multi: true,
    },
  ],
})
export class NotificationModule {}
