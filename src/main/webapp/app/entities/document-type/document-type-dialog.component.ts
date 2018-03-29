import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentType } from './document-type.model';
import { DocumentTypePopupService } from './document-type-popup.service';
import { DocumentTypeService } from './document-type.service';

@Component({
    selector: 'jhi-document-type-dialog',
    templateUrl: './document-type-dialog.component.html'
})
export class DocumentTypeDialogComponent implements OnInit {

    documentType: DocumentType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private documentTypeService: DocumentTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documentType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentTypeService.update(this.documentType));
        } else {
            this.subscribeToSaveResponse(
                this.documentTypeService.create(this.documentType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentType>>) {
        result.subscribe((res: HttpResponse<DocumentType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentType) {
        this.eventManager.broadcast({ name: 'documentTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-document-type-popup',
    template: ''
})
export class DocumentTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentTypePopupService: DocumentTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentTypePopupService
                    .open(DocumentTypeDialogComponent as Component, params['id']);
            } else {
                this.documentTypePopupService
                    .open(DocumentTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
