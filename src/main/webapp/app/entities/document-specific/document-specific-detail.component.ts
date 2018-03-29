import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentSpecific } from './document-specific.model';
import { DocumentSpecificService } from './document-specific.service';

@Component({
    selector: 'jhi-document-specific-detail',
    templateUrl: './document-specific-detail.component.html'
})
export class DocumentSpecificDetailComponent implements OnInit, OnDestroy {

    documentSpecific: DocumentSpecific;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentSpecificService: DocumentSpecificService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentSpecifics();
    }

    load(id) {
        this.documentSpecificService.find(id)
            .subscribe((documentSpecificResponse: HttpResponse<DocumentSpecific>) => {
                this.documentSpecific = documentSpecificResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentSpecifics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentSpecificListModification',
            (response) => this.load(this.documentSpecific.id)
        );
    }
}
