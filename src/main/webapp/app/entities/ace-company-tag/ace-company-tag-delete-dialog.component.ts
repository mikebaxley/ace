import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AceCompanyTag } from './ace-company-tag.model';
import { AceCompanyTagPopupService } from './ace-company-tag-popup.service';
import { AceCompanyTagService } from './ace-company-tag.service';

@Component({
    selector: 'jhi-ace-company-tag-delete-dialog',
    templateUrl: './ace-company-tag-delete-dialog.component.html'
})
export class AceCompanyTagDeleteDialogComponent {

    aceCompanyTag: AceCompanyTag;

    constructor(
        private aceCompanyTagService: AceCompanyTagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aceCompanyTagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'aceCompanyTagListModification',
                content: 'Deleted an aceCompanyTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ace-company-tag-delete-popup',
    template: ''
})
export class AceCompanyTagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aceCompanyTagPopupService: AceCompanyTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.aceCompanyTagPopupService
                .open(AceCompanyTagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
