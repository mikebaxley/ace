import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AceCompanyComponent } from './ace-company.component';
import { AceCompanyDetailComponent } from './ace-company-detail.component';
import { AceCompanyPopupComponent } from './ace-company-dialog.component';
import { AceCompanyDeletePopupComponent } from './ace-company-delete-dialog.component';

export const aceCompanyRoute: Routes = [
    {
        path: 'ace-company',
        component: AceCompanyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ace-company/:id',
        component: AceCompanyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aceCompanyPopupRoute: Routes = [
    {
        path: 'ace-company-new',
        component: AceCompanyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ace-company/:id/edit',
        component: AceCompanyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ace-company/:id/delete',
        component: AceCompanyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AceCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
