import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AceCompanyTagComponent } from './ace-company-tag.component';
import { AceCompanyTagDetailComponent } from './ace-company-tag-detail.component';
import { AceCompanyTagPopupComponent } from './ace-company-tag-dialog.component';
import { AceCompanyTagDeletePopupComponent } from './ace-company-tag-delete-dialog.component';

export const aceCompanyTagRoute: Routes = [
    {
        path: 'ace-company-tag',
        component: AceCompanyTagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanyTags'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ace-company-tag/:id',
        component: AceCompanyTagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanyTags'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aceCompanyTagPopupRoute: Routes = [
    {
        path: 'ace-company-tag-new',
        component: AceCompanyTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanyTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ace-company-tag/:id/edit',
        component: AceCompanyTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanyTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ace-company-tag/:id/delete',
        component: AceCompanyTagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanyTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
