/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { BundleGroupComponent } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group.component';
import { BundleGroupService } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group.service';
import { BundleGroup } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group.model';

describe('Component Tests', () => {

    describe('BundleGroup Management Component', () => {
        let comp: BundleGroupComponent;
        let fixture: ComponentFixture<BundleGroupComponent>;
        let service: BundleGroupService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleGroupComponent],
                providers: [
                    BundleGroupService
                ]
            })
            .overrideTemplate(BundleGroupComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleGroupService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BundleGroup(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bundleGroups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
