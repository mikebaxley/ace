import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bundle } from './bundle.model';
import { BundlePopupService } from './bundle-popup.service';
import { BundleService } from './bundle.service';

@Component({
    selector: 'jhi-bundle-delete-dialog',
    templateUrl: './bundle-delete-dialog.component.html'
})
export class BundleDeleteDialogComponent {

    bundle: Bundle;

    constructor(
        private bundleService: BundleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bundleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bundleListModification',
                content: 'Deleted an bundle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bundle-delete-popup',
    template: ''
})
export class BundleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundlePopupService: BundlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bundlePopupService
                .open(BundleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
