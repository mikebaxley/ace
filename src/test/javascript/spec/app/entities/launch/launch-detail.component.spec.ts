/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { LaunchDetailComponent } from '../../../../../../main/webapp/app/entities/launch/launch-detail.component';
import { LaunchService } from '../../../../../../main/webapp/app/entities/launch/launch.service';
import { Launch } from '../../../../../../main/webapp/app/entities/launch/launch.model';

describe('Component Tests', () => {

    describe('Launch Management Detail Component', () => {
        let comp: LaunchDetailComponent;
        let fixture: ComponentFixture<LaunchDetailComponent>;
        let service: LaunchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [LaunchDetailComponent],
                providers: [
                    LaunchService
                ]
            })
            .overrideTemplate(LaunchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LaunchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LaunchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Launch(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.launch).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
