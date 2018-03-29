/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { WebServiceRequestAuditDialogComponent } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit-dialog.component';
import { WebServiceRequestAuditService } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.service';
import { WebServiceRequestAudit } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.model';
import { PrintManagementService } from '../../../../../../main/webapp/app/entities/print-management';

describe('Component Tests', () => {

    describe('WebServiceRequestAudit Management Dialog Component', () => {
        let comp: WebServiceRequestAuditDialogComponent;
        let fixture: ComponentFixture<WebServiceRequestAuditDialogComponent>;
        let service: WebServiceRequestAuditService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [WebServiceRequestAuditDialogComponent],
                providers: [
                    PrintManagementService,
                    WebServiceRequestAuditService
                ]
            })
            .overrideTemplate(WebServiceRequestAuditDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebServiceRequestAuditDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebServiceRequestAuditService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WebServiceRequestAudit(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.webServiceRequestAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'webServiceRequestAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WebServiceRequestAudit();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.webServiceRequestAudit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'webServiceRequestAuditListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
