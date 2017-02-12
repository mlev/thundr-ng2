import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PublicDataService {

    public constructor(private http: Http) {
    }

    public getContactDetails() {
        return this.http.get("/api/home/contact")
            .map((res) => res.json());
    }
}