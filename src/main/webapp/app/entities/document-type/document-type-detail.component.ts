import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentType } from './document-type.model';
import { DocumentTypeService } from './document-type.service';

@Component({
    selector: 'jhi-document-type-detail',
    templateUrl: './document-type-detail.component.html'
})
export class DocumentTypeDetailComponent implements OnInit, OnDestroy {

    documentType: DocumentType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentTypeService: DocumentTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentTypes();
    }

    load(id) {
        this.documentTypeService.find(id)
            .subscribe((documentTypeResponse: HttpResponse<DocumentType>) => {
                this.documentType = documentTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentTypeListModification',
            (response) => this.load(this.documentType.id)
        );
    }
}
