import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {PublicModule} from "./public/public.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        CoreModule,
        PublicModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}