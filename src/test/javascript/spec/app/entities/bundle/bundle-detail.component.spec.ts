/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { BundleDetailComponent } from '../../../../../../main/webapp/app/entities/bundle/bundle-detail.component';
import { BundleService } from '../../../../../../main/webapp/app/entities/bundle/bundle.service';
import { Bundle } from '../../../../../../main/webapp/app/entities/bundle/bundle.model';

describe('Component Tests', () => {

    describe('Bundle Management Detail Component', () => {
        let comp: BundleDetailComponent;
        let fixture: ComponentFixture<BundleDetailComponent>;
        let service: BundleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleDetailComponent],
                providers: [
                    BundleService
                ]
            })
            .overrideTemplate(BundleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Bundle(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bundle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
