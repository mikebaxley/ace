import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AceCompanyTag } from './ace-company-tag.model';
import { AceCompanyTagService } from './ace-company-tag.service';

@Component({
    selector: 'jhi-ace-company-tag-detail',
    templateUrl: './ace-company-tag-detail.component.html'
})
export class AceCompanyTagDetailComponent implements OnInit, OnDestroy {

    aceCompanyTag: AceCompanyTag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private aceCompanyTagService: AceCompanyTagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAceCompanyTags();
    }

    load(id) {
        this.aceCompanyTagService.find(id)
            .subscribe((aceCompanyTagResponse: HttpResponse<AceCompanyTag>) => {
                this.aceCompanyTag = aceCompanyTagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAceCompanyTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'aceCompanyTagListModification',
            (response) => this.load(this.aceCompanyTag.id)
        );
    }
}
