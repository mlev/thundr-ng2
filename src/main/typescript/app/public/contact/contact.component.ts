import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "contact",
    template: `
    <h2>Contact {{contact?.name}}</h2>
    <dl>
      <dt>Phone</dt>
      <dd>{{contact?.phone}}</dd>
      <dt>Website</dt>
      <dd>{{contact?.website}}</dd>
    </dl>
`
})
export class ContactComponent implements OnInit {

    public contact;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit() {
        this.contact = this.route.snapshot.data["contact"];
    }
}