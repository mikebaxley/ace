/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AceTestModule } from '../../../test.module';
import { PrinterDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/printer/printer-delete-dialog.component';
import { PrinterService } from '../../../../../../main/webapp/app/entities/printer/printer.service';

describe('Component Tests', () => {

    describe('Printer Management Delete Component', () => {
        let comp: PrinterDeleteDialogComponent;
        let fixture: ComponentFixture<PrinterDeleteDialogComponent>;
        let service: PrinterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [PrinterDeleteDialogComponent],
                providers: [
                    PrinterService
                ]
            })
            .overrideTemplate(PrinterDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinterService);
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
