import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AceCompanyTag } from './ace-company-tag.model';
import { AceCompanyTagService } from './ace-company-tag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ace-company-tag',
    templateUrl: './ace-company-tag.component.html'
})
export class AceCompanyTagComponent implements OnInit, OnDestroy {
aceCompanyTags: AceCompanyTag[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aceCompanyTagService: AceCompanyTagService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.aceCompanyTagService.query().subscribe(
            (res: HttpResponse<AceCompanyTag[]>) => {
                this.aceCompanyTags = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAceCompanyTags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AceCompanyTag) {
        return item.id;
    }
    registerChangeInAceCompanyTags() {
        this.eventSubscriber = this.eventManager.subscribe('aceCompanyTagListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
