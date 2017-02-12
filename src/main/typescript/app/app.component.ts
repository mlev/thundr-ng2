import {Component} from "@angular/core";

@Component({
    selector: "app",
    template: `
    <div>
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
    </div>
    `
})
export class AppComponent {
}