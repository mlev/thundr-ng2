import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CoreModule} from "../core/core.module";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {ContactResolver} from "./contact/contact.resolver";
import {HomeComponent} from "./home/home.component";
import {PublicDataService} from "./services/public-data.service";

@NgModule({
    imports: [
        HttpModule,
        CoreModule
    ],
    declarations: [
        AboutComponent,
        ContactComponent,
        HomeComponent
    ],
    providers: [
        PublicDataService,
        ContactResolver
    ]
})
export class PublicModule {
}