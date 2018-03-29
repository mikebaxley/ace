/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { PrintManagementDialogComponent } from '../../../../../../main/webapp/app/entities/print-management/print-management-dialog.component';
import { PrintManagementService } from '../../../../../../main/webapp/app/entities/print-management/print-management.service';
import { PrintManagement } from '../../../../../../main/webapp/app/entities/print-management/print-management.model';
import { WebServiceRequestAuditService } from '../../../../../../main/webapp/app/entities/web-service-request-audit';

describe('Component Tests', () => {

    describe('PrintManagement Management Dialog Component', () => {
        let comp: PrintManagementDialogComponent;
        let fixture: ComponentFixture<PrintManagementDialogComponent>;
        let service: PrintManagementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [PrintManagementDialogComponent],
                providers: [
                    WebServiceRequestAuditService,
                    PrintManagementService
                ]
            })
            .overrideTemplate(PrintManagementDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrintManagementDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintManagementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrintManagement(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.printManagement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'printManagementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrintManagement();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.printManagement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'printManagementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
