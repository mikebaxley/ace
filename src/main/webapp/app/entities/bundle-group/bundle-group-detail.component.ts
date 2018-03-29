import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BundleGroup } from './bundle-group.model';
import { BundleGroupService } from './bundle-group.service';

@Component({
    selector: 'jhi-bundle-group-detail',
    templateUrl: './bundle-group-detail.component.html'
})
export class BundleGroupDetailComponent implements OnInit, OnDestroy {

    bundleGroup: BundleGroup;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bundleGroupService: BundleGroupService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBundleGroups();
    }

    load(id) {
        this.bundleGroupService.find(id)
            .subscribe((bundleGroupResponse: HttpResponse<BundleGroup>) => {
                this.bundleGroup = bundleGroupResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBundleGroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bundleGroupListModification',
            (response) => this.load(this.bundleGroup.id)
        );
    }
}
