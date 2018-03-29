/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { DocumentTypeDetailComponent } from '../../../../../../main/webapp/app/entities/document-type/document-type-detail.component';
import { DocumentTypeService } from '../../../../../../main/webapp/app/entities/document-type/document-type.service';
import { DocumentType } from '../../../../../../main/webapp/app/entities/document-type/document-type.model';

describe('Component Tests', () => {

    describe('DocumentType Management Detail Component', () => {
        let comp: DocumentTypeDetailComponent;
        let fixture: ComponentFixture<DocumentTypeDetailComponent>;
        let service: DocumentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentTypeDetailComponent],
                providers: [
                    DocumentTypeService
                ]
            })
            .overrideTemplate(DocumentTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documentType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
