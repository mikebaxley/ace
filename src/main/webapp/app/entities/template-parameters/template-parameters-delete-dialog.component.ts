import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TemplateParameters } from './template-parameters.model';
import { TemplateParametersPopupService } from './template-parameters-popup.service';
import { TemplateParametersService } from './template-parameters.service';

@Component({
    selector: 'jhi-template-parameters-delete-dialog',
    templateUrl: './template-parameters-delete-dialog.component.html'
})
export class TemplateParametersDeleteDialogComponent {

    templateParameters: TemplateParameters;

    constructor(
        private templateParametersService: TemplateParametersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.templateParametersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'templateParametersListModification',
                content: 'Deleted an templateParameters'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-template-parameters-delete-popup',
    template: ''
})
export class TemplateParametersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private templateParametersPopupService: TemplateParametersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.templateParametersPopupService
                .open(TemplateParametersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
