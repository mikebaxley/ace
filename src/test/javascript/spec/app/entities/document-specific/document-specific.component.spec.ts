/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { DocumentSpecificComponent } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.component';
import { DocumentSpecificService } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.service';
import { DocumentSpecific } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.model';

describe('Component Tests', () => {

    describe('DocumentSpecific Management Component', () => {
        let comp: DocumentSpecificComponent;
        let fixture: ComponentFixture<DocumentSpecificComponent>;
        let service: DocumentSpecificService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentSpecificComponent],
                providers: [
                    DocumentSpecificService
                ]
            })
            .overrideTemplate(DocumentSpecificComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentSpecificComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentSpecificService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentSpecific(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentSpecifics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
