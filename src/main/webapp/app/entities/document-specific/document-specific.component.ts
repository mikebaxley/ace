import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentSpecific } from './document-specific.model';
import { DocumentSpecificService } from './document-specific.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-document-specific',
    templateUrl: './document-specific.component.html'
})
export class DocumentSpecificComponent implements OnInit, OnDestroy {
documentSpecifics: DocumentSpecific[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentSpecificService: DocumentSpecificService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.documentSpecificService.query().subscribe(
            (res: HttpResponse<DocumentSpecific[]>) => {
                this.documentSpecifics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentSpecifics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentSpecific) {
        return item.id;
    }
    registerChangeInDocumentSpecifics() {
        this.eventSubscriber = this.eventManager.subscribe('documentSpecificListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
