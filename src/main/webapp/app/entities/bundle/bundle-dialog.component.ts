import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bundle } from './bundle.model';
import { BundlePopupService } from './bundle-popup.service';
import { BundleService } from './bundle.service';
import { BundleGroup, BundleGroupService } from '../bundle-group';

@Component({
    selector: 'jhi-bundle-dialog',
    templateUrl: './bundle-dialog.component.html'
})
export class BundleDialogComponent implements OnInit {

    bundle: Bundle;
    isSaving: boolean;

    bundlegroups: BundleGroup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bundleService: BundleService,
        private bundleGroupService: BundleGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bundleGroupService.query()
            .subscribe((res: HttpResponse<BundleGroup[]>) => { this.bundlegroups = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bundle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bundleService.update(this.bundle));
        } else {
            this.subscribeToSaveResponse(
                this.bundleService.create(this.bundle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bundle>>) {
        result.subscribe((res: HttpResponse<Bundle>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bundle) {
        this.eventManager.broadcast({ name: 'bundleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBundleGroupById(index: number, item: BundleGroup) {
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
    selector: 'jhi-bundle-popup',
    template: ''
})
export class BundlePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundlePopupService: BundlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bundlePopupService
                    .open(BundleDialogComponent as Component, params['id']);
            } else {
                this.bundlePopupService
                    .open(BundleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
