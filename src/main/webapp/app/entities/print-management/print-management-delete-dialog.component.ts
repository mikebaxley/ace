import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrintManagement } from './print-management.model';
import { PrintManagementPopupService } from './print-management-popup.service';
import { PrintManagementService } from './print-management.service';

@Component({
    selector: 'jhi-print-management-delete-dialog',
    templateUrl: './print-management-delete-dialog.component.html'
})
export class PrintManagementDeleteDialogComponent {

    printManagement: PrintManagement;

    constructor(
        private printManagementService: PrintManagementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.printManagementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'printManagementListModification',
                content: 'Deleted an printManagement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-print-management-delete-popup',
    template: ''
})
export class PrintManagementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printManagementPopupService: PrintManagementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.printManagementPopupService
                .open(PrintManagementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
