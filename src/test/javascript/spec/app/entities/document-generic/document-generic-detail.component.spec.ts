/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { DocumentGenericDetailComponent } from '../../../../../../main/webapp/app/entities/document-generic/document-generic-detail.component';
import { DocumentGenericService } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.service';
import { DocumentGeneric } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.model';

describe('Component Tests', () => {

    describe('DocumentGeneric Management Detail Component', () => {
        let comp: DocumentGenericDetailComponent;
        let fixture: ComponentFixture<DocumentGenericDetailComponent>;
        let service: DocumentGenericService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentGenericDetailComponent],
                providers: [
                    DocumentGenericService
                ]
            })
            .overrideTemplate(DocumentGenericDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentGenericDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentGenericService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentGeneric(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documentGeneric).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
