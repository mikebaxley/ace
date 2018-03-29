import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TemplateParameters } from './template-parameters.model';
import { TemplateParametersService } from './template-parameters.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-template-parameters',
    templateUrl: './template-parameters.component.html'
})
export class TemplateParametersComponent implements OnInit, OnDestroy {
templateParameters: TemplateParameters[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private templateParametersService: TemplateParametersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.templateParametersService.query().subscribe(
            (res: HttpResponse<TemplateParameters[]>) => {
                this.templateParameters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTemplateParameters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TemplateParameters) {
        return item.id;
    }
    registerChangeInTemplateParameters() {
        this.eventSubscriber = this.eventManager.subscribe('templateParametersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
