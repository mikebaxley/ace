import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AceCompany } from './ace-company.model';
import { AceCompanyService } from './ace-company.service';

@Component({
    selector: 'jhi-ace-company-detail',
    templateUrl: './ace-company-detail.component.html'
})
export class AceCompanyDetailComponent implements OnInit, OnDestroy {

    aceCompany: AceCompany;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private aceCompanyService: AceCompanyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAceCompanies();
    }

    load(id) {
        this.aceCompanyService.find(id)
            .subscribe((aceCompanyResponse: HttpResponse<AceCompany>) => {
                this.aceCompany = aceCompanyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAceCompanies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'aceCompanyListModification',
            (response) => this.load(this.aceCompany.id)
        );
    }
}
