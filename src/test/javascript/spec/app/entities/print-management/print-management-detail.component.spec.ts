/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { PrintManagementDetailComponent } from '../../../../../../main/webapp/app/entities/print-management/print-management-detail.component';
import { PrintManagementService } from '../../../../../../main/webapp/app/entities/print-management/print-management.service';
import { PrintManagement } from '../../../../../../main/webapp/app/entities/print-management/print-management.model';

describe('Component Tests', () => {

    describe('PrintManagement Management Detail Component', () => {
        let comp: PrintManagementDetailComponent;
        let fixture: ComponentFixture<PrintManagementDetailComponent>;
        let service: PrintManagementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [PrintManagementDetailComponent],
                providers: [
                    PrintManagementService
                ]
            })
            .overrideTemplate(PrintManagementDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrintManagementDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintManagementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrintManagement(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.printManagement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
