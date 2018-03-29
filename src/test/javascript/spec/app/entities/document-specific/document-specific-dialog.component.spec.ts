/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { DocumentSpecificDialogComponent } from '../../../../../../main/webapp/app/entities/document-specific/document-specific-dialog.component';
import { DocumentSpecificService } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.service';
import { DocumentSpecific } from '../../../../../../main/webapp/app/entities/document-specific/document-specific.model';
import { DocumentStateService } from '../../../../../../main/webapp/app/entities/document-state';
import { DocumentGenericService } from '../../../../../../main/webapp/app/entities/document-generic';

describe('Component Tests', () => {

    describe('DocumentSpecific Management Dialog Component', () => {
        let comp: DocumentSpecificDialogComponent;
        let fixture: ComponentFixture<DocumentSpecificDialogComponent>;
        let service: DocumentSpecificService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentSpecificDialogComponent],
                providers: [
                    DocumentStateService,
                    DocumentGenericService,
                    DocumentSpecificService
                ]
            })
            .overrideTemplate(DocumentSpecificDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentSpecificDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentSpecificService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentSpecific(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentSpecific = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentSpecificListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentSpecific();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentSpecific = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentSpecificListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
