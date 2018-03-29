import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentState } from './document-state.model';
import { DocumentStatePopupService } from './document-state-popup.service';
import { DocumentStateService } from './document-state.service';
import { DocumentSpecific, DocumentSpecificService } from '../document-specific';

@Component({
    selector: 'jhi-document-state-dialog',
    templateUrl: './document-state-dialog.component.html'
})
export class DocumentStateDialogComponent implements OnInit {

    documentState: DocumentState;
    isSaving: boolean;

    documentspecifics: DocumentSpecific[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentStateService: DocumentStateService,
        private documentSpecificService: DocumentSpecificService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentSpecificService.query()
            .subscribe((res: HttpResponse<DocumentSpecific[]>) => { this.documentspecifics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documentState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentStateService.update(this.documentState));
        } else {
            this.subscribeToSaveResponse(
                this.documentStateService.create(this.documentState));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentState>>) {
        result.subscribe((res: HttpResponse<DocumentState>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentState) {
        this.eventManager.broadcast({ name: 'documentStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDocumentSpecificById(index: number, item: DocumentSpecific) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-document-state-popup',
    template: ''
})
export class DocumentStatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentStatePopupService: DocumentStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentStatePopupService
                    .open(DocumentStateDialogComponent as Component, params['id']);
            } else {
                this.documentStatePopupService
                    .open(DocumentStateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
