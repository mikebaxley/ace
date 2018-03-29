/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { TemplateParametersDialogComponent } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters-dialog.component';
import { TemplateParametersService } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.service';
import { TemplateParameters } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.model';
import { DocumentSpecificService } from '../../../../../../main/webapp/app/entities/document-specific';

describe('Component Tests', () => {

    describe('TemplateParameters Management Dialog Component', () => {
        let comp: TemplateParametersDialogComponent;
        let fixture: ComponentFixture<TemplateParametersDialogComponent>;
        let service: TemplateParametersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [TemplateParametersDialogComponent],
                providers: [
                    DocumentSpecificService,
                    TemplateParametersService
                ]
            })
            .overrideTemplate(TemplateParametersDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateParametersDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateParametersService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemplateParameters(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.templateParameters = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'templateParametersListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemplateParameters();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.templateParameters = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'templateParametersListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
