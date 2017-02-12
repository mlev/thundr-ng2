import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {PublicDataService} from "../services/public-data.service";

@Injectable()
export class ContactResolver implements Resolve<any> {

    constructor(private publicDataService: PublicDataService) {
    }

    public resolve() {
        return this.publicDataService.getContactDetails();
    }
}