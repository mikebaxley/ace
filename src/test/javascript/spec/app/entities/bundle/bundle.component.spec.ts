/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { BundleComponent } from '../../../../../../main/webapp/app/entities/bundle/bundle.component';
import { BundleService } from '../../../../../../main/webapp/app/entities/bundle/bundle.service';
import { Bundle } from '../../../../../../main/webapp/app/entities/bundle/bundle.model';

describe('Component Tests', () => {

    describe('Bundle Management Component', () => {
        let comp: BundleComponent;
        let fixture: ComponentFixture<BundleComponent>;
        let service: BundleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleComponent],
                providers: [
                    BundleService
                ]
            })
            .overrideTemplate(BundleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bundle(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bundles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
