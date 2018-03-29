/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { DocumentGenericComponent } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.component';
import { DocumentGenericService } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.service';
import { DocumentGeneric } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.model';

describe('Component Tests', () => {

    describe('DocumentGeneric Management Component', () => {
        let comp: DocumentGenericComponent;
        let fixture: ComponentFixture<DocumentGenericComponent>;
        let service: DocumentGenericService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentGenericComponent],
                providers: [
                    DocumentGenericService
                ]
            })
            .overrideTemplate(DocumentGenericComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentGenericComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentGenericService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentGeneric(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentGenerics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
