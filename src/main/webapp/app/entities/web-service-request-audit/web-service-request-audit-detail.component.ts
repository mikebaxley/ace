import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { WebServiceRequestAuditService } from './web-service-request-audit.service';

@Component({
    selector: 'jhi-web-service-request-audit-detail',
    templateUrl: './web-service-request-audit-detail.component.html'
})
export class WebServiceRequestAuditDetailComponent implements OnInit, OnDestroy {

    webServiceRequestAudit: WebServiceRequestAudit;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private webServiceRequestAuditService: WebServiceRequestAuditService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWebServiceRequestAudits();
    }

    load(id) {
        this.webServiceRequestAuditService.find(id)
            .subscribe((webServiceRequestAuditResponse: HttpResponse<WebServiceRequestAudit>) => {
                this.webServiceRequestAudit = webServiceRequestAuditResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWebServiceRequestAudits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'webServiceRequestAuditListModification',
            (response) => this.load(this.webServiceRequestAudit.id)
        );
    }
}
