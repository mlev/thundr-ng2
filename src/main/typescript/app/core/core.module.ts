import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PublicDataService} from "../public/services/public-data.service";
import {FooterComponent} from "./layout/footer.component";
import {NavbarComponent} from "./layout/navbar.component";

@NgModule({
    imports: [
        HttpModule,
        NgbModule,
        RouterModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent
    ],
    declarations: [
        NavbarComponent,
        FooterComponent
    ],
    providers: [
        PublicDataService
    ]
})
export class CoreModule {
}