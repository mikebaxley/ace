/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { BundleToDocumentComponent } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.component';
import { BundleToDocumentService } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.service';
import { BundleToDocument } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.model';

describe('Component Tests', () => {

    describe('BundleToDocument Management Component', () => {
        let comp: BundleToDocumentComponent;
        let fixture: ComponentFixture<BundleToDocumentComponent>;
        let service: BundleToDocumentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleToDocumentComponent],
                providers: [
                    BundleToDocumentService
                ]
            })
            .overrideTemplate(BundleToDocumentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleToDocumentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleToDocumentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BundleToDocument(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bundleToDocuments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
