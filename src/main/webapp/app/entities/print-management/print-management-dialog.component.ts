import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrintManagement } from './print-management.model';
import { PrintManagementPopupService } from './print-management-popup.service';
import { PrintManagementService } from './print-management.service';
import { WebServiceRequestAudit, WebServiceRequestAuditService } from '../web-service-request-audit';

@Component({
    selector: 'jhi-print-management-dialog',
    templateUrl: './print-management-dialog.component.html'
})
export class PrintManagementDialogComponent implements OnInit {

    printManagement: PrintManagement;
    isSaving: boolean;

    fromrequests: WebServiceRequestAudit[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private printManagementService: PrintManagementService,
        private webServiceRequestAuditService: WebServiceRequestAuditService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.webServiceRequestAuditService
            .query({filter: 'printmanagement-is-null'})
            .subscribe((res: HttpResponse<WebServiceRequestAudit[]>) => {
                if (!this.printManagement.fromRequest || !this.printManagement.fromRequest.id) {
                    this.fromrequests = res.body;
                } else {
                    this.webServiceRequestAuditService
                        .find(this.printManagement.fromRequest.id)
                        .subscribe((subRes: HttpResponse<WebServiceRequestAudit>) => {
                            this.fromrequests = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.printManagement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.printManagementService.update(this.printManagement));
        } else {
            this.subscribeToSaveResponse(
                this.printManagementService.create(this.printManagement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrintManagement>>) {
        result.subscribe((res: HttpResponse<PrintManagement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrintManagement) {
        this.eventManager.broadcast({ name: 'printManagementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWebServiceRequestAuditById(index: number, item: WebServiceRequestAudit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-print-management-popup',
    template: ''
})
export class PrintManagementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printManagementPopupService: PrintManagementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.printManagementPopupService
                    .open(PrintManagementDialogComponent as Component, params['id']);
            } else {
                this.printManagementPopupService
                    .open(PrintManagementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
