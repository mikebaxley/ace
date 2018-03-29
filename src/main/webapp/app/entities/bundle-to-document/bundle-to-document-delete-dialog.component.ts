import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BundleToDocument } from './bundle-to-document.model';
import { BundleToDocumentPopupService } from './bundle-to-document-popup.service';
import { BundleToDocumentService } from './bundle-to-document.service';

@Component({
    selector: 'jhi-bundle-to-document-delete-dialog',
    templateUrl: './bundle-to-document-delete-dialog.component.html'
})
export class BundleToDocumentDeleteDialogComponent {

    bundleToDocument: BundleToDocument;

    constructor(
        private bundleToDocumentService: BundleToDocumentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bundleToDocumentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bundleToDocumentListModification',
                content: 'Deleted an bundleToDocument'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bundle-to-document-delete-popup',
    template: ''
})
export class BundleToDocumentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bundleToDocumentPopupService: BundleToDocumentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bundleToDocumentPopupService
                .open(BundleToDocumentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
