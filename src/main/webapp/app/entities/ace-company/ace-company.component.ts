import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AceCompany } from './ace-company.model';
import { AceCompanyService } from './ace-company.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ace-company',
    templateUrl: './ace-company.component.html'
})
export class AceCompanyComponent implements OnInit, OnDestroy {
aceCompanies: AceCompany[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aceCompanyService: AceCompanyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.aceCompanyService.query().subscribe(
            (res: HttpResponse<AceCompany[]>) => {
                this.aceCompanies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAceCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AceCompany) {
        return item.id;
    }
    registerChangeInAceCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('aceCompanyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
