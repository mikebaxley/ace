import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentState } from './document-state.model';
import { DocumentStateService } from './document-state.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-document-state',
    templateUrl: './document-state.component.html'
})
export class DocumentStateComponent implements OnInit, OnDestroy {
documentStates: DocumentState[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentStateService: DocumentStateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.documentStateService.query().subscribe(
            (res: HttpResponse<DocumentState[]>) => {
                this.documentStates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentStates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentState) {
        return item.id;
    }
    registerChangeInDocumentStates() {
        this.eventSubscriber = this.eventManager.subscribe('documentStateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
