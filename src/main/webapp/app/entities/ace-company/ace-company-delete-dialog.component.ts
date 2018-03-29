import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AceCompany } from './ace-company.model';
import { AceCompanyPopupService } from './ace-company-popup.service';
import { AceCompanyService } from './ace-company.service';

@Component({
    selector: 'jhi-ace-company-delete-dialog',
    templateUrl: './ace-company-delete-dialog.component.html'
})
export class AceCompanyDeleteDialogComponent {

    aceCompany: AceCompany;

    constructor(
        private aceCompanyService: AceCompanyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aceCompanyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'aceCompanyListModification',
                content: 'Deleted an aceCompany'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ace-company-delete-popup',
    template: ''
})
export class AceCompanyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aceCompanyPopupService: AceCompanyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.aceCompanyPopupService
                .open(AceCompanyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
