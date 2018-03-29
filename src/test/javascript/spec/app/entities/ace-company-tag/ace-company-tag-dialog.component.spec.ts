/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { AceCompanyTagDialogComponent } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag-dialog.component';
import { AceCompanyTagService } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.service';
import { AceCompanyTag } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.model';
import { AceCompanyService } from '../../../../../../main/webapp/app/entities/ace-company';

describe('Component Tests', () => {

    describe('AceCompanyTag Management Dialog Component', () => {
        let comp: AceCompanyTagDialogComponent;
        let fixture: ComponentFixture<AceCompanyTagDialogComponent>;
        let service: AceCompanyTagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyTagDialogComponent],
                providers: [
                    AceCompanyService,
                    AceCompanyTagService
                ]
            })
            .overrideTemplate(AceCompanyTagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyTagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyTagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AceCompanyTag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.aceCompanyTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aceCompanyTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AceCompanyTag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.aceCompanyTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aceCompanyTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
