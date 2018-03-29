import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Launch } from './launch.model';
import { LaunchService } from './launch.service';

@Component({
    selector: 'jhi-launch-detail',
    templateUrl: './launch-detail.component.html'
})
export class LaunchDetailComponent implements OnInit, OnDestroy {

    launch: Launch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private launchService: LaunchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLaunches();
    }

    load(id) {
        this.launchService.find(id)
            .subscribe((launchResponse: HttpResponse<Launch>) => {
                this.launch = launchResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLaunches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'launchListModification',
            (response) => this.load(this.launch.id)
        );
    }
}
