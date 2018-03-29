import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AceCompany } from './ace-company.model';
import { AceCompanyPopupService } from './ace-company-popup.service';
import { AceCompanyService } from './ace-company.service';
import { Printer, PrinterService } from '../printer';
import { DocumentGeneric, DocumentGenericService } from '../document-generic';

@Component({
    selector: 'jhi-ace-company-dialog',
    templateUrl: './ace-company-dialog.component.html'
})
export class AceCompanyDialogComponent implements OnInit {

    aceCompany: AceCompany;
    isSaving: boolean;

    printers: Printer[];

    documentgenerics: DocumentGeneric[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private aceCompanyService: AceCompanyService,
        private printerService: PrinterService,
        private documentGenericService: DocumentGenericService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.printerService.query()
            .subscribe((res: HttpResponse<Printer[]>) => { this.printers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.documentGenericService.query()
            .subscribe((res: HttpResponse<DocumentGeneric[]>) => { this.documentgenerics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aceCompany.id !== undefined) {
            this.subscribeToSaveResponse(
                this.aceCompanyService.update(this.aceCompany));
        } else {
            this.subscribeToSaveResponse(
                this.aceCompanyService.create(this.aceCompany));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AceCompany>>) {
        result.subscribe((res: HttpResponse<AceCompany>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AceCompany) {
        this.eventManager.broadcast({ name: 'aceCompanyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrinterById(index: number, item: Printer) {
        return item.id;
    }

    trackDocumentGenericById(index: number, item: DocumentGeneric) {
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
    selector: 'jhi-ace-company-popup',
    template: ''
})
export class AceCompanyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aceCompanyPopupService: AceCompanyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.aceCompanyPopupService
                    .open(AceCompanyDialogComponent as Component, params['id']);
            } else {
                this.aceCompanyPopupService
                    .open(AceCompanyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
