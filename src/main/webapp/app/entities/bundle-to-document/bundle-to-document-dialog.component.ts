import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BundleToDocument } from './bundle-to-document.model';
import { BundleToDocumentPopupService } from './bundle-to-document-popup.service';
import { BundleToDocumentService } from './bundle-to-document.service';
import { Bundle, BundleService } from '../bundle';
import { DocumentGeneric, DocumentGenericService } from '../document-generic';

@Component({
    selector: 'jhi-bundle-to-document-dialog',
    templateUrl: './bundle-to-document-dialog.component.html'
})
export class BundleToDocumentDialogComponent implements OnInit {

    bundleToDocument: BundleToDocument;
    isSaving: boolean;

    bundles: Bundle[];

    documentgenerics: DocumentGeneric[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bundleToDocumentService: BundleToDocumentService,
        private bundleService: BundleService,
        private documentGenericService: DocumentGenericService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bundleService.query()
            .subscribe((res: HttpResponse<Bundle[]>) => { this.bundles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.documentGenericService.query()
            .subscribe((res: HttpResponse<DocumentGeneric[]>) => { this.documentgenerics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bundleToDocument.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bundleToDocumentService.update(this.bundleToDocument));
        } else {
            this.subscribeToSaveResponse(
                this.bundleToDocumentService.create(this.bundleToDocument));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BundleToDocument>>) {
        result.subscribe((res: HttpResponse<BundleToDocument>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BundleToDocument) {
        this.eventManager.broadcast({ name: 'bundleToDocumentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBundleById(index: number, item: Bundle) {
        return item.id;
    }

    trackDocumentGenericById(index: number, item: DocumentGeneric) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bundle-to-document-popup',
    template: ''
})
export class BundleToDocumentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundleToDocumentPopupService: BundleToDocumentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bundleToDocumentPopupService
                    .open(BundleToDocumentDialogComponent as Component, params['id']);
            } else {
                this.bundleToDocumentPopupService
                    .open(BundleToDocumentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
