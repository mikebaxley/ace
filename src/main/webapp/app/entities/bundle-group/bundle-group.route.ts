import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BundleGroupComponent } from './bundle-group.component';
import { BundleGroupDetailComponent } from './bundle-group-detail.component';
import { BundleGroupPopupComponent } from './bundle-group-dialog.component';
import { BundleGroupDeletePopupComponent } from './bundle-group-delete-dialog.component';

export const bundleGroupRoute: Routes = [
    {
        path: 'bundle-group',
        component: BundleGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleGroups'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bundle-group/:id',
        component: BundleGroupDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bundleGroupPopupRoute: Routes = [
    {
        path: 'bundle-group-new',
        component: BundleGroupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle-group/:id/edit',
        component: BundleGroupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle-group/:id/delete',
        component: BundleGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
