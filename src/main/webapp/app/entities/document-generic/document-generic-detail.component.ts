import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentGeneric } from './document-generic.model';
import { DocumentGenericService } from './document-generic.service';

@Component({
    selector: 'jhi-document-generic-detail',
    templateUrl: './document-generic-detail.component.html'
})
export class DocumentGenericDetailComponent implements OnInit, OnDestroy {

    documentGeneric: DocumentGeneric;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentGenericService: DocumentGenericService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentGenerics();
    }

    load(id) {
        this.documentGenericService.find(id)
            .subscribe((documentGenericResponse: HttpResponse<DocumentGeneric>) => {
                this.documentGeneric = documentGenericResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentGenerics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentGenericListModification',
            (response) => this.load(this.documentGeneric.id)
        );
    }
}
