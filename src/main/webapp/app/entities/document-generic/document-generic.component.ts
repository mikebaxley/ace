import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentGeneric } from './document-generic.model';
import { DocumentGenericService } from './document-generic.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-document-generic',
    templateUrl: './document-generic.component.html'
})
export class DocumentGenericComponent implements OnInit, OnDestroy {
documentGenerics: DocumentGeneric[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentGenericService: DocumentGenericService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.documentGenericService.query().subscribe(
            (res: HttpResponse<DocumentGeneric[]>) => {
                this.documentGenerics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentGenerics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentGeneric) {
        return item.id;
    }
    registerChangeInDocumentGenerics() {
        this.eventSubscriber = this.eventManager.subscribe('documentGenericListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
