import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentType } from './document-type.model';
import { DocumentTypePopupService } from './document-type-popup.service';
import { DocumentTypeService } from './document-type.service';

@Component({
    selector: 'jhi-document-type-delete-dialog',
    templateUrl: './document-type-delete-dialog.component.html'
})
export class DocumentTypeDeleteDialogComponent {

    documentType: DocumentType;

    constructor(
        private documentTypeService: DocumentTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentTypeListModification',
                content: 'Deleted an documentType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-type-delete-popup',
    template: ''
})
export class DocumentTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentTypePopupService: DocumentTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentTypePopupService
                .open(DocumentTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
