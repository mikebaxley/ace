import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LaunchComponent } from './launch.component';
import { LaunchDetailComponent } from './launch-detail.component';
import { LaunchPopupComponent } from './launch-dialog.component';
import { LaunchDeletePopupComponent } from './launch-delete-dialog.component';

export const launchRoute: Routes = [
    {
        path: 'launch',
        component: LaunchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Launches'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'launch/:id',
        component: LaunchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Launches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const launchPopupRoute: Routes = [
    {
        path: 'launch-new',
        component: LaunchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Launches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'launch/:id/edit',
        component: LaunchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Launches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'launch/:id/delete',
        component: LaunchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Launches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
