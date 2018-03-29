import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { WebServiceRequestAuditPopupService } from './web-service-request-audit-popup.service';
import { WebServiceRequestAuditService } from './web-service-request-audit.service';

@Component({
    selector: 'jhi-web-service-request-audit-delete-dialog',
    templateUrl: './web-service-request-audit-delete-dialog.component.html'
})
export class WebServiceRequestAuditDeleteDialogComponent {

    webServiceRequestAudit: WebServiceRequestAudit;

    constructor(
        private webServiceRequestAuditService: WebServiceRequestAuditService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.webServiceRequestAuditService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'webServiceRequestAuditListModification',
                content: 'Deleted an webServiceRequestAudit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-web-service-request-audit-delete-popup',
    template: ''
})
export class WebServiceRequestAuditDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private webServiceRequestAuditPopupService: WebServiceRequestAuditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.webServiceRequestAuditPopupService
                .open(WebServiceRequestAuditDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
