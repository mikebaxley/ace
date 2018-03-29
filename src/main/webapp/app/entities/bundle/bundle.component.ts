import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bundle } from './bundle.model';
import { BundleService } from './bundle.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bundle',
    templateUrl: './bundle.component.html'
})
export class BundleComponent implements OnInit, OnDestroy {
bundles: Bundle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bundleService: BundleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bundleService.query().subscribe(
            (res: HttpResponse<Bundle[]>) => {
                this.bundles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBundles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bundle) {
        return item.id;
    }
    registerChangeInBundles() {
        this.eventSubscriber = this.eventManager.subscribe('bundleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
