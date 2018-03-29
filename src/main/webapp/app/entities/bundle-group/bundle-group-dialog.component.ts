import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BundleGroup } from './bundle-group.model';
import { BundleGroupPopupService } from './bundle-group-popup.service';
import { BundleGroupService } from './bundle-group.service';
import { Bundle, BundleService } from '../bundle';

@Component({
    selector: 'jhi-bundle-group-dialog',
    templateUrl: './bundle-group-dialog.component.html'
})
export class BundleGroupDialogComponent implements OnInit {

    bundleGroup: BundleGroup;
    isSaving: boolean;

    bundles: Bundle[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bundleGroupService: BundleGroupService,
        private bundleService: BundleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bundleService.query()
            .subscribe((res: HttpResponse<Bundle[]>) => { this.bundles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bundleGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bundleGroupService.update(this.bundleGroup));
        } else {
            this.subscribeToSaveResponse(
                this.bundleGroupService.create(this.bundleGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BundleGroup>>) {
        result.subscribe((res: HttpResponse<BundleGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BundleGroup) {
        this.eventManager.broadcast({ name: 'bundleGroupListModification', content: 'OK'});
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
    selector: 'jhi-bundle-group-popup',
    template: ''
})
export class BundleGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundleGroupPopupService: BundleGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bundleGroupPopupService
                    .open(BundleGroupDialogComponent as Component, params['id']);
            } else {
                this.bundleGroupPopupService
                    .open(BundleGroupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
