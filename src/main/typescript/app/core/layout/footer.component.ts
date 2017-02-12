import {Component} from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
    <footer class="footer">
        <div class="container">
            <span class="text-muted">Place sticky footer content here.</span>
        </div>
    </footer>
    `
})
export class FooterComponent {
    public isCollapsed: boolean = true;
}