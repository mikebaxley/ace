import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentType } from './document-type.model';
import { DocumentTypeService } from './document-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-document-type',
    templateUrl: './document-type.component.html'
})
export class DocumentTypeComponent implements OnInit, OnDestroy {
documentTypes: DocumentType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentTypeService: DocumentTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.documentTypeService.query().subscribe(
            (res: HttpResponse<DocumentType[]>) => {
                this.documentTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentType) {
        return item.id;
    }
    registerChangeInDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('documentTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
