import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    LaunchService,
    LaunchPopupService,
    LaunchComponent,
    LaunchDetailComponent,
    LaunchDialogComponent,
    LaunchPopupComponent,
    LaunchDeletePopupComponent,
    LaunchDeleteDialogComponent,
    launchRoute,
    launchPopupRoute,
} from './';

const ENTITY_STATES = [
    ...launchRoute,
    ...launchPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LaunchComponent,
        LaunchDetailComponent,
        LaunchDialogComponent,
        LaunchDeleteDialogComponent,
        LaunchPopupComponent,
        LaunchDeletePopupComponent,
    ],
    entryComponents: [
        LaunchComponent,
        LaunchDialogComponent,
        LaunchPopupComponent,
        LaunchDeleteDialogComponent,
        LaunchDeletePopupComponent,
    ],
    providers: [
        LaunchService,
        LaunchPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceLaunchModule {}
