import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BundleGroup } from './bundle-group.model';
import { BundleGroupService } from './bundle-group.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bundle-group',
    templateUrl: './bundle-group.component.html'
})
export class BundleGroupComponent implements OnInit, OnDestroy {
bundleGroups: BundleGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bundleGroupService: BundleGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bundleGroupService.query().subscribe(
            (res: HttpResponse<BundleGroup[]>) => {
                this.bundleGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBundleGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BundleGroup) {
        return item.id;
    }
    registerChangeInBundleGroups() {
        this.eventSubscriber = this.eventManager.subscribe('bundleGroupListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
