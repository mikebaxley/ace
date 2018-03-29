import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BundleComponent } from './bundle.component';
import { BundleDetailComponent } from './bundle-detail.component';
import { BundlePopupComponent } from './bundle-dialog.component';
import { BundleDeletePopupComponent } from './bundle-delete-dialog.component';

export const bundleRoute: Routes = [
    {
        path: 'bundle',
        component: BundleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bundles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bundle/:id',
        component: BundleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bundles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bundlePopupRoute: Routes = [
    {
        path: 'bundle-new',
        component: BundlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bundles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle/:id/edit',
        component: BundlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bundles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle/:id/delete',
        component: BundleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bundles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
