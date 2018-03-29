import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrintManagement } from './print-management.model';
import { PrintManagementService } from './print-management.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-print-management',
    templateUrl: './print-management.component.html'
})
export class PrintManagementComponent implements OnInit, OnDestroy {
printManagements: PrintManagement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private printManagementService: PrintManagementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.printManagementService.query().subscribe(
            (res: HttpResponse<PrintManagement[]>) => {
                this.printManagements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrintManagements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PrintManagement) {
        return item.id;
    }
    registerChangeInPrintManagements() {
        this.eventSubscriber = this.eventManager.subscribe('printManagementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
