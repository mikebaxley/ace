/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { DocumentGenericDialogComponent } from '../../../../../../main/webapp/app/entities/document-generic/document-generic-dialog.component';
import { DocumentGenericService } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.service';
import { DocumentGeneric } from '../../../../../../main/webapp/app/entities/document-generic/document-generic.model';
import { DocumentTypeService } from '../../../../../../main/webapp/app/entities/document-type';
import { AceCompanyService } from '../../../../../../main/webapp/app/entities/ace-company';

describe('Component Tests', () => {

    describe('DocumentGeneric Management Dialog Component', () => {
        let comp: DocumentGenericDialogComponent;
        let fixture: ComponentFixture<DocumentGenericDialogComponent>;
        let service: DocumentGenericService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [DocumentGenericDialogComponent],
                providers: [
                    DocumentTypeService,
                    AceCompanyService,
                    DocumentGenericService
                ]
            })
            .overrideTemplate(DocumentGenericDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentGenericDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentGenericService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentGeneric(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentGeneric = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentGenericListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentGeneric();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentGeneric = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentGenericListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
