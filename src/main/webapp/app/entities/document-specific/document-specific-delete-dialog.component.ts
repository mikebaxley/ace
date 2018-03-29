import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentSpecific } from './document-specific.model';
import { DocumentSpecificPopupService } from './document-specific-popup.service';
import { DocumentSpecificService } from './document-specific.service';

@Component({
    selector: 'jhi-document-specific-delete-dialog',
    templateUrl: './document-specific-delete-dialog.component.html'
})
export class DocumentSpecificDeleteDialogComponent {

    documentSpecific: DocumentSpecific;

    constructor(
        private documentSpecificService: DocumentSpecificService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentSpecificService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentSpecificListModification',
                content: 'Deleted an documentSpecific'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-specific-delete-popup',
    template: ''
})
export class DocumentSpecificDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentSpecificPopupService: DocumentSpecificPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentSpecificPopupService
                .open(DocumentSpecificDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
