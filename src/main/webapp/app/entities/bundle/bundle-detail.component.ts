import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Bundle } from './bundle.model';
import { BundleService } from './bundle.service';

@Component({
    selector: 'jhi-bundle-detail',
    templateUrl: './bundle-detail.component.html'
})
export class BundleDetailComponent implements OnInit, OnDestroy {

    bundle: Bundle;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bundleService: BundleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBundles();
    }

    load(id) {
        this.bundleService.find(id)
            .subscribe((bundleResponse: HttpResponse<Bundle>) => {
                this.bundle = bundleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBundles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bundleListModification',
            (response) => this.load(this.bundle.id)
        );
    }
}
