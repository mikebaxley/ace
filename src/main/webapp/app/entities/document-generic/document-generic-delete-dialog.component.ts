import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentGeneric } from './document-generic.model';
import { DocumentGenericPopupService } from './document-generic-popup.service';
import { DocumentGenericService } from './document-generic.service';

@Component({
    selector: 'jhi-document-generic-delete-dialog',
    templateUrl: './document-generic-delete-dialog.component.html'
})
export class DocumentGenericDeleteDialogComponent {

    documentGeneric: DocumentGeneric;

    constructor(
        private documentGenericService: DocumentGenericService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentGenericService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentGenericListModification',
                content: 'Deleted an documentGeneric'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-generic-delete-popup',
    template: ''
})
export class DocumentGenericDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentGenericPopupService: DocumentGenericPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentGenericPopupService
                .open(DocumentGenericDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
