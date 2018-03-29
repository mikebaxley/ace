import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrintManagement } from './print-management.model';
import { PrintManagementService } from './print-management.service';

@Component({
    selector: 'jhi-print-management-detail',
    templateUrl: './print-management-detail.component.html'
})
export class PrintManagementDetailComponent implements OnInit, OnDestroy {

    printManagement: PrintManagement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private printManagementService: PrintManagementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrintManagements();
    }

    load(id) {
        this.printManagementService.find(id)
            .subscribe((printManagementResponse: HttpResponse<PrintManagement>) => {
                this.printManagement = printManagementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrintManagements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'printManagementListModification',
            (response) => this.load(this.printManagement.id)
        );
    }
}
