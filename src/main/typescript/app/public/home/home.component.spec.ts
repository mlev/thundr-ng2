import {DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {HomeComponent} from "./home.component";

describe("HomeComponent", function() {

    let de: DebugElement;
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [NgbTabsetModule.forRoot()]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css("h1"));
    });

    it("should create component", () => expect(comp).toBeDefined());

    it("should have expected <h1> text", () => {
        fixture.detectChanges();
        const h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/HomeComponent/i,
            "<h1> should say something about HomeComponent");
    });
});