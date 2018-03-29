/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { DocumentSpecificDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/document-specific/document-specific-delete-dialog.component';
import { DocumentSpecificService } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.service';

describe('Component Tests', () => {

    describe('DocumentSpecific Management Delete Component', () => {
        let comp: DocumentSpecificDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentSpecificDeleteDialogComponent>;
        let service: DocumentSpecificService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentSpecificDeleteDialogComponent],
                providers: [
                    DocumentSpecificService
                ]
            })
            .overrideTemplate(DocumentSpecificDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentSpecificDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentSpecificService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
