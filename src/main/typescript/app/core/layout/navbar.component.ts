import {Component} from "@angular/core";

@Component({
    selector: "app-navbar",
    template: `
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    
            <button class="navbar-toggler navbar-toggler-right" type="button" (click)="isCollapsed = !isCollapsed"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <a class="navbar-brand" [routerLink]="['home']">Navbar</a>
    
            <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" [routerLinkActive]="['active']">
                        <a class="nav-link" [routerLink]="['home']">Home</a>
                    </li>
                    <li class="nav-item" [routerLinkActive]="['active']">
                        <a class="nav-link" [routerLink]="['about']">About</a>
                    </li>
                    <li class="nav-item" [routerLinkActive]="['active']">
                        <a class="nav-link" [routerLink]="['contact']">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class NavbarComponent {
    public isCollapsed: boolean = true;
}