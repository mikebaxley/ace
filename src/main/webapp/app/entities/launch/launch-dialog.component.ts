import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Launch } from './launch.model';
import { LaunchPopupService } from './launch-popup.service';
import { LaunchService } from './launch.service';
import { BundleGroup, BundleGroupService } from '../bundle-group';

@Component({
    selector: 'jhi-launch-dialog',
    templateUrl: './launch-dialog.component.html'
})
export class LaunchDialogComponent implements OnInit {

    launch: Launch;
    isSaving: boolean;

    bundlegroups: BundleGroup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private launchService: LaunchService,
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
        if (this.launch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.launchService.update(this.launch));
        } else {
            this.subscribeToSaveResponse(
                this.launchService.create(this.launch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Launch>>) {
        result.subscribe((res: HttpResponse<Launch>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Launch) {
        this.eventManager.broadcast({ name: 'launchListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-launch-popup',
    template: ''
})
export class LaunchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private launchPopupService: LaunchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.launchPopupService
                    .open(LaunchDialogComponent as Component, params['id']);
            } else {
                this.launchPopupService
                    .open(LaunchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
