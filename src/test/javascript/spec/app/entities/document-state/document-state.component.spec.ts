/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { DocumentStateComponent } from '../../../../../../main/webapp/app/entities/document-state/document-state.component';
import { DocumentStateService } from '../../../../../../main/webapp/app/entities/document-state/document-state.service';
import { DocumentState } from '../../../../../../main/webapp/app/entities/document-state/document-state.model';

describe('Component Tests', () => {

    describe('DocumentState Management Component', () => {
        let comp: DocumentStateComponent;
        let fixture: ComponentFixture<DocumentStateComponent>;
        let service: DocumentStateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentStateComponent],
                providers: [
                    DocumentStateService
                ]
            })
            .overrideTemplate(DocumentStateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentStateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentStateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentState(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentStates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
