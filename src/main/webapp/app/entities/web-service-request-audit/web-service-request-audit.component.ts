import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { WebServiceRequestAuditService } from './web-service-request-audit.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-web-service-request-audit',
    templateUrl: './web-service-request-audit.component.html'
})
export class WebServiceRequestAuditComponent implements OnInit, OnDestroy {
webServiceRequestAudits: WebServiceRequestAudit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private webServiceRequestAuditService: WebServiceRequestAuditService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.webServiceRequestAuditService.query().subscribe(
            (res: HttpResponse<WebServiceRequestAudit[]>) => {
                this.webServiceRequestAudits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWebServiceRequestAudits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WebServiceRequestAudit) {
        return item.id;
    }
    registerChangeInWebServiceRequestAudits() {
        this.eventSubscriber = this.eventManager.subscribe('webServiceRequestAuditListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
