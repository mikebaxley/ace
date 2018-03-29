import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { WebServiceRequestAuditPopupService } from './web-service-request-audit-popup.service';
import { WebServiceRequestAuditService } from './web-service-request-audit.service';
import { PrintManagement, PrintManagementService } from '../print-management';

@Component({
    selector: 'jhi-web-service-request-audit-dialog',
    templateUrl: './web-service-request-audit-dialog.component.html'
})
export class WebServiceRequestAuditDialogComponent implements OnInit {

    webServiceRequestAudit: WebServiceRequestAudit;
    isSaving: boolean;

    printmanagements: PrintManagement[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private webServiceRequestAuditService: WebServiceRequestAuditService,
        private printManagementService: PrintManagementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.printManagementService.query()
            .subscribe((res: HttpResponse<PrintManagement[]>) => { this.printmanagements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.webServiceRequestAudit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.webServiceRequestAuditService.update(this.webServiceRequestAudit));
        } else {
            this.subscribeToSaveResponse(
                this.webServiceRequestAuditService.create(this.webServiceRequestAudit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WebServiceRequestAudit>>) {
        result.subscribe((res: HttpResponse<WebServiceRequestAudit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WebServiceRequestAudit) {
        this.eventManager.broadcast({ name: 'webServiceRequestAuditListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrintManagementById(index: number, item: PrintManagement) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-web-service-request-audit-popup',
    template: ''
})
export class WebServiceRequestAuditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private webServiceRequestAuditPopupService: WebServiceRequestAuditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.webServiceRequestAuditPopupService
                    .open(WebServiceRequestAuditDialogComponent as Component, params['id']);
            } else {
                this.webServiceRequestAuditPopupService
                    .open(WebServiceRequestAuditDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
