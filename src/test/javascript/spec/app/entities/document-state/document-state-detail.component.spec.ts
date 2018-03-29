/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { DocumentStateDetailComponent } from '../../../../../../main/webapp/app/entities/document-state/document-state-detail.component';
import { DocumentStateService } from '../../../../../../main/webapp/app/entities/document-state/document-state.service';
import { DocumentState } from '../../../../../../main/webapp/app/entities/document-state/document-state.model';

describe('Component Tests', () => {

    describe('DocumentState Management Detail Component', () => {
        let comp: DocumentStateDetailComponent;
        let fixture: ComponentFixture<DocumentStateDetailComponent>;
        let service: DocumentStateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentStateDetailComponent],
                providers: [
                    DocumentStateService
                ]
            })
            .overrideTemplate(DocumentStateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentStateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentStateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentState(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documentState).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
