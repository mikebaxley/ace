/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { LaunchComponent } from '../../../../../../main/webapp/app/entities/launch/launch.component';
import { LaunchService } from '../../../../../../main/webapp/app/entities/launch/launch.service';
import { Launch } from '../../../../../../main/webapp/app/entities/launch/launch.model';

describe('Component Tests', () => {

    describe('Launch Management Component', () => {
        let comp: LaunchComponent;
        let fixture: ComponentFixture<LaunchComponent>;
        let service: LaunchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [LaunchComponent],
                providers: [
                    LaunchService
                ]
            })
            .overrideTemplate(LaunchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LaunchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LaunchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Launch(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.launches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
