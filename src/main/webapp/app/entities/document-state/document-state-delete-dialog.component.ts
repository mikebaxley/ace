import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentState } from './document-state.model';
import { DocumentStatePopupService } from './document-state-popup.service';
import { DocumentStateService } from './document-state.service';

@Component({
    selector: 'jhi-document-state-delete-dialog',
    templateUrl: './document-state-delete-dialog.component.html'
})
export class DocumentStateDeleteDialogComponent {

    documentState: DocumentState;

    constructor(
        private documentStateService: DocumentStateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentStateListModification',
                content: 'Deleted an documentState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-state-delete-popup',
    template: ''
})
export class DocumentStateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentStatePopupService: DocumentStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentStatePopupService
                .open(DocumentStateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
