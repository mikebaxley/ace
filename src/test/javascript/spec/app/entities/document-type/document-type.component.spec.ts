/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { DocumentTypeComponent } from '../../../../../../main/webapp/app/entities/document-type/document-type.component';
import { DocumentTypeService } from '../../../../../../main/webapp/app/entities/document-type/document-type.service';
import { DocumentType } from '../../../../../../main/webapp/app/entities/document-type/document-type.model';

describe('Component Tests', () => {

    describe('DocumentType Management Component', () => {
        let comp: DocumentTypeComponent;
        let fixture: ComponentFixture<DocumentTypeComponent>;
        let service: DocumentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentTypeComponent],
                providers: [
                    DocumentTypeService
                ]
            })
            .overrideTemplate(DocumentTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
