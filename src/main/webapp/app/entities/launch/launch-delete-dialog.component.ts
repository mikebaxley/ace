import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Launch } from './launch.model';
import { LaunchPopupService } from './launch-popup.service';
import { LaunchService } from './launch.service';

@Component({
    selector: 'jhi-launch-delete-dialog',
    templateUrl: './launch-delete-dialog.component.html'
})
export class LaunchDeleteDialogComponent {

    launch: Launch;

    constructor(
        private launchService: LaunchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.launchService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'launchListModification',
                content: 'Deleted an launch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-launch-delete-popup',
    template: ''
})
export class LaunchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private launchPopupService: LaunchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.launchPopupService
                .open(LaunchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
