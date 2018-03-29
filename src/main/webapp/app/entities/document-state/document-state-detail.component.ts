import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentState } from './document-state.model';
import { DocumentStateService } from './document-state.service';

@Component({
    selector: 'jhi-document-state-detail',
    templateUrl: './document-state-detail.component.html'
})
export class DocumentStateDetailComponent implements OnInit, OnDestroy {

    documentState: DocumentState;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentStateService: DocumentStateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentStates();
    }

    load(id) {
        this.documentStateService.find(id)
            .subscribe((documentStateResponse: HttpResponse<DocumentState>) => {
                this.documentState = documentStateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentStateListModification',
            (response) => this.load(this.documentState.id)
        );
    }
}
