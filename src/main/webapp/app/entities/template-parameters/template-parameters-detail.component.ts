import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TemplateParameters } from './template-parameters.model';
import { TemplateParametersService } from './template-parameters.service';

@Component({
    selector: 'jhi-template-parameters-detail',
    templateUrl: './template-parameters-detail.component.html'
})
export class TemplateParametersDetailComponent implements OnInit, OnDestroy {

    templateParameters: TemplateParameters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private templateParametersService: TemplateParametersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTemplateParameters();
    }

    load(id) {
        this.templateParametersService.find(id)
            .subscribe((templateParametersResponse: HttpResponse<TemplateParameters>) => {
                this.templateParameters = templateParametersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTemplateParameters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'templateParametersListModification',
            (response) => this.load(this.templateParameters.id)
        );
    }
}
