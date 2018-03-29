import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentSpecific } from './document-specific.model';
import { DocumentSpecificPopupService } from './document-specific-popup.service';
import { DocumentSpecificService } from './document-specific.service';
import { DocumentGeneric, DocumentGenericService } from '../document-generic';
import { DocumentState, DocumentStateService } from '../document-state';

@Component({
    selector: 'jhi-document-specific-dialog',
    templateUrl: './document-specific-dialog.component.html'
})
export class DocumentSpecificDialogComponent implements OnInit {

    documentSpecific: DocumentSpecific;
    isSaving: boolean;

    documentgenerics: DocumentGeneric[];

    documentstates: DocumentState[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentSpecificService: DocumentSpecificService,
        private documentGenericService: DocumentGenericService,
        private documentStateService: DocumentStateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentGenericService.query()
            .subscribe((res: HttpResponse<DocumentGeneric[]>) => { this.documentgenerics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.documentStateService.query()
            .subscribe((res: HttpResponse<DocumentState[]>) => { this.documentstates = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documentSpecific.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentSpecificService.update(this.documentSpecific));
        } else {
            this.subscribeToSaveResponse(
                this.documentSpecificService.create(this.documentSpecific));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentSpecific>>) {
        result.subscribe((res: HttpResponse<DocumentSpecific>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentSpecific) {
        this.eventManager.broadcast({ name: 'documentSpecificListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDocumentGenericById(index: number, item: DocumentGeneric) {
        return item.id;
    }

    trackDocumentStateById(index: number, item: DocumentState) {
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
    selector: 'jhi-document-specific-popup',
    template: ''
})
export class DocumentSpecificPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentSpecificPopupService: DocumentSpecificPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentSpecificPopupService
                    .open(DocumentSpecificDialogComponent as Component, params['id']);
            } else {
                this.documentSpecificPopupService
                    .open(DocumentSpecificDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
