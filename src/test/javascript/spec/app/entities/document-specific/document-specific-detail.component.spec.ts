/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { DocumentSpecificDetailComponent } from '../../../../../../main/webapp/app/entities/document-specific/document-specific-detail.component';
import { DocumentSpecificService } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.service';
import { DocumentSpecific } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.model';

describe('Component Tests', () => {

    describe('DocumentSpecific Management Detail Component', () => {
        let comp: DocumentSpecificDetailComponent;
        let fixture: ComponentFixture<DocumentSpecificDetailComponent>;
        let service: DocumentSpecificService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentSpecificDetailComponent],
                providers: [
                    DocumentSpecificService
                ]
            })
            .overrideTemplate(DocumentSpecificDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentSpecificDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentSpecificService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentSpecific(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documentSpecific).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
