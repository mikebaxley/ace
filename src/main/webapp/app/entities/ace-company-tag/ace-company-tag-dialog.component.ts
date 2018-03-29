import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AceCompanyTag } from './ace-company-tag.model';
import { AceCompanyTagPopupService } from './ace-company-tag-popup.service';
import { AceCompanyTagService } from './ace-company-tag.service';
import { AceCompany, AceCompanyService } from '../ace-company';

@Component({
    selector: 'jhi-ace-company-tag-dialog',
    templateUrl: './ace-company-tag-dialog.component.html'
})
export class AceCompanyTagDialogComponent implements OnInit {

    aceCompanyTag: AceCompanyTag;
    isSaving: boolean;

    acecompanies: AceCompany[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private aceCompanyTagService: AceCompanyTagService,
        private aceCompanyService: AceCompanyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.aceCompanyService.query()
            .subscribe((res: HttpResponse<AceCompany[]>) => { this.acecompanies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aceCompanyTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.aceCompanyTagService.update(this.aceCompanyTag));
        } else {
            this.subscribeToSaveResponse(
                this.aceCompanyTagService.create(this.aceCompanyTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AceCompanyTag>>) {
        result.subscribe((res: HttpResponse<AceCompanyTag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AceCompanyTag) {
        this.eventManager.broadcast({ name: 'aceCompanyTagListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAceCompanyById(index: number, item: AceCompany) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ace-company-tag-popup',
    template: ''
})
export class AceCompanyTagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aceCompanyTagPopupService: AceCompanyTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.aceCompanyTagPopupService
                    .open(AceCompanyTagDialogComponent as Component, params['id']);
            } else {
                this.aceCompanyTagPopupService
                    .open(AceCompanyTagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
