/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { PrintManagementComponent } from '../../../../../../main/webapp/app/entities/print-management/print-management.component';
import { PrintManagementService } from '../../../../../../main/webapp/app/entities/print-management/print-management.service';
import { PrintManagement } from '../../../../../../main/webapp/app/entities/print-management/print-management.model';

describe('Component Tests', () => {

    describe('PrintManagement Management Component', () => {
        let comp: PrintManagementComponent;
        let fixture: ComponentFixture<PrintManagementComponent>;
        let service: PrintManagementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [PrintManagementComponent],
                providers: [
                    PrintManagementService
                ]
            })
            .overrideTemplate(PrintManagementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrintManagementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintManagementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrintManagement(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.printManagements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
