import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./public/about/about.component";
import {ContactComponent} from "./public/contact/contact.component";
import {ContactResolver} from "./public/contact/contact.resolver";
import {HomeComponent} from "./public/home/home.component";

export const appRoutes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "about", component: AboutComponent},
    {
        path: "contact",
        component: ContactComponent,
        resolve: {
            contact: ContactResolver
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}