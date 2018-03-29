import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BundleToDocument } from './bundle-to-document.model';
import { BundleToDocumentService } from './bundle-to-document.service';

@Component({
    selector: 'jhi-bundle-to-document-detail',
    templateUrl: './bundle-to-document-detail.component.html'
})
export class BundleToDocumentDetailComponent implements OnInit, OnDestroy {

    bundleToDocument: BundleToDocument;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bundleToDocumentService: BundleToDocumentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBundleToDocuments();
    }

    load(id) {
        this.bundleToDocumentService.find(id)
            .subscribe((bundleToDocumentResponse: HttpResponse<BundleToDocument>) => {
                this.bundleToDocument = bundleToDocumentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBundleToDocuments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bundleToDocumentListModification',
            (response) => this.load(this.bundleToDocument.id)
        );
    }
}
