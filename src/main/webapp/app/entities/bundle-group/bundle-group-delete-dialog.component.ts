import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BundleGroup } from './bundle-group.model';
import { BundleGroupPopupService } from './bundle-group-popup.service';
import { BundleGroupService } from './bundle-group.service';

@Component({
    selector: 'jhi-bundle-group-delete-dialog',
    templateUrl: './bundle-group-delete-dialog.component.html'
})
export class BundleGroupDeleteDialogComponent {

    bundleGroup: BundleGroup;

    constructor(
        private bundleGroupService: BundleGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bundleGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bundleGroupListModification',
                content: 'Deleted an bundleGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bundle-group-delete-popup',
    template: ''
})
export class BundleGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundleGroupPopupService: BundleGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bundleGroupPopupService
                .open(BundleGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
