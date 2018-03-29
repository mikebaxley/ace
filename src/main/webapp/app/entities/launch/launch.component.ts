import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Launch } from './launch.model';
import { LaunchService } from './launch.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-launch',
    templateUrl: './launch.component.html'
})
export class LaunchComponent implements OnInit, OnDestroy {
launches: Launch[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private launchService: LaunchService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.launchService.query().subscribe(
            (res: HttpResponse<Launch[]>) => {
                this.launches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLaunches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Launch) {
        return item.id;
    }
    registerChangeInLaunches() {
        this.eventSubscriber = this.eventManager.subscribe('launchListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
