/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { AceCompanyTagDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag-delete-dialog.component';
import { AceCompanyTagService } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.service';

describe('Component Tests', () => {

    describe('AceCompanyTag Management Delete Component', () => {
        let comp: AceCompanyTagDeleteDialogComponent;
        let fixture: ComponentFixture<AceCompanyTagDeleteDialogComponent>;
        let service: AceCompanyTagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyTagDeleteDialogComponent],
                providers: [
                    AceCompanyTagService
                ]
            })
            .overrideTemplate(AceCompanyTagDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyTagDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyTagService);
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
