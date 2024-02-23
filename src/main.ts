import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import 'zone.js'; 

//registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVJpR2Nbe05yflRCal1YVBYiSV9jS3pTdEdgWHtfdHVcRWheVg==")


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
