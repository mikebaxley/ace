/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { BundleToDocumentDetailComponent } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document-detail.component';
import { BundleToDocumentService } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.service';
import { BundleToDocument } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.model';

describe('Component Tests', () => {

    describe('BundleToDocument Management Detail Component', () => {
        let comp: BundleToDocumentDetailComponent;
        let fixture: ComponentFixture<BundleToDocumentDetailComponent>;
        let service: BundleToDocumentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleToDocumentDetailComponent],
                providers: [
                    BundleToDocumentService
                ]
            })
            .overrideTemplate(BundleToDocumentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleToDocumentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleToDocumentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BundleToDocument(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bundleToDocument).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
