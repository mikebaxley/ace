import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentGeneric } from './document-generic.model';
import { DocumentGenericPopupService } from './document-generic-popup.service';
import { DocumentGenericService } from './document-generic.service';
import { DocumentType, DocumentTypeService } from '../document-type';
import { AceCompany, AceCompanyService } from '../ace-company';

@Component({
    selector: 'jhi-document-generic-dialog',
    templateUrl: './document-generic-dialog.component.html'
})
export class DocumentGenericDialogComponent implements OnInit {

    documentGeneric: DocumentGeneric;
    isSaving: boolean;

    documenttypes: DocumentType[];

    acecompanies: AceCompany[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentGenericService: DocumentGenericService,
        private documentTypeService: DocumentTypeService,
        private aceCompanyService: AceCompanyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentTypeService.query()
            .subscribe((res: HttpResponse<DocumentType[]>) => { this.documenttypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.aceCompanyService.query()
            .subscribe((res: HttpResponse<AceCompany[]>) => { this.acecompanies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documentGeneric.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentGenericService.update(this.documentGeneric));
        } else {
            this.subscribeToSaveResponse(
                this.documentGenericService.create(this.documentGeneric));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentGeneric>>) {
        result.subscribe((res: HttpResponse<DocumentGeneric>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentGeneric) {
        this.eventManager.broadcast({ name: 'documentGenericListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDocumentTypeById(index: number, item: DocumentType) {
        return item.id;
    }

    trackAceCompanyById(index: number, item: AceCompany) {
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
    selector: 'jhi-document-generic-popup',
    template: ''
})
export class DocumentGenericPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentGenericPopupService: DocumentGenericPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentGenericPopupService
                    .open(DocumentGenericDialogComponent as Component, params['id']);
            } else {
                this.documentGenericPopupService
                    .open(DocumentGenericDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
