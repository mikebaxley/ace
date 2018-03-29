import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Printer } from './printer.model';
import { PrinterPopupService } from './printer-popup.service';
import { PrinterService } from './printer.service';

@Component({
    selector: 'jhi-printer-dialog',
    templateUrl: './printer-dialog.component.html'
})
export class PrinterDialogComponent implements OnInit {

    printer: Printer;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private printerService: PrinterService,
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
        if (this.printer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.printerService.update(this.printer));
        } else {
            this.subscribeToSaveResponse(
                this.printerService.create(this.printer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Printer>>) {
        result.subscribe((res: HttpResponse<Printer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Printer) {
        this.eventManager.broadcast({ name: 'printerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-printer-popup',
    template: ''
})
export class PrinterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printerPopupService: PrinterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.printerPopupService
                    .open(PrinterDialogComponent as Component, params['id']);
            } else {
                this.printerPopupService
                    .open(PrinterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
