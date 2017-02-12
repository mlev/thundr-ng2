import {Component} from "@angular/core";

@Component({
    selector: "home",
    template: `<h1>Hello {{name}}</h1>`
})
export class HomeComponent {
    public name = "HomeComponent";
}