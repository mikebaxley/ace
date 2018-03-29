/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { TemplateParametersDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters-delete-dialog.component';
import { TemplateParametersService } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.service';

describe('Component Tests', () => {

    describe('TemplateParameters Management Delete Component', () => {
        let comp: TemplateParametersDeleteDialogComponent;
        let fixture: ComponentFixture<TemplateParametersDeleteDialogComponent>;
        let service: TemplateParametersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [TemplateParametersDeleteDialogComponent],
                providers: [
                    TemplateParametersService
                ]
            })
            .overrideTemplate(TemplateParametersDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateParametersDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateParametersService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
