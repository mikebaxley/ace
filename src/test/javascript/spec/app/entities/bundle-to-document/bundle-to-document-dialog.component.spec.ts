/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { BundleToDocumentDialogComponent } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document-dialog.component';
import { BundleToDocumentService } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.service';
import { BundleToDocument } from '../../../../../../main/webapp/app/entities/bundle-to-document/bundle-to-document.model';
import { BundleService } from '../../../../../../main/webapp/app/entities/bundle';
import { DocumentGenericService } from '../../../../../../main/webapp/app/entities/document-generic';

describe('Component Tests', () => {

    describe('BundleToDocument Management Dialog Component', () => {
        let comp: BundleToDocumentDialogComponent;
        let fixture: ComponentFixture<BundleToDocumentDialogComponent>;
        let service: BundleToDocumentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleToDocumentDialogComponent],
                providers: [
                    BundleService,
                    DocumentGenericService,
                    BundleToDocumentService
                ]
            })
            .overrideTemplate(BundleToDocumentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleToDocumentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleToDocumentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BundleToDocument(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bundleToDocument = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bundleToDocumentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BundleToDocument();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bundleToDocument = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bundleToDocumentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
