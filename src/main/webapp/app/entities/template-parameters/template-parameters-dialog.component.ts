import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TemplateParameters } from './template-parameters.model';
import { TemplateParametersPopupService } from './template-parameters-popup.service';
import { TemplateParametersService } from './template-parameters.service';
import { DocumentSpecific, DocumentSpecificService } from '../document-specific';

@Component({
    selector: 'jhi-template-parameters-dialog',
    templateUrl: './template-parameters-dialog.component.html'
})
export class TemplateParametersDialogComponent implements OnInit {

    templateParameters: TemplateParameters;
    isSaving: boolean;

    documentspecifics: DocumentSpecific[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private templateParametersService: TemplateParametersService,
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
        if (this.templateParameters.id !== undefined) {
            this.subscribeToSaveResponse(
                this.templateParametersService.update(this.templateParameters));
        } else {
            this.subscribeToSaveResponse(
                this.templateParametersService.create(this.templateParameters));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TemplateParameters>>) {
        result.subscribe((res: HttpResponse<TemplateParameters>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TemplateParameters) {
        this.eventManager.broadcast({ name: 'templateParametersListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-template-parameters-popup',
    template: ''
})
export class TemplateParametersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private templateParametersPopupService: TemplateParametersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.templateParametersPopupService
                    .open(TemplateParametersDialogComponent as Component, params['id']);
            } else {
                this.templateParametersPopupService
                    .open(TemplateParametersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
