import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AceCompanyTag } from './ace-company-tag.model';
import { AceCompanyTagService } from './ace-company-tag.service';

@Injectable()
export class AceCompanyTagPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private aceCompanyTagService: AceCompanyTagService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.aceCompanyTagService.find(id)
                    .subscribe((aceCompanyTagResponse: HttpResponse<AceCompanyTag>) => {
                        const aceCompanyTag: AceCompanyTag = aceCompanyTagResponse.body;
                        this.ngbModalRef = this.aceCompanyTagModalRef(component, aceCompanyTag);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.aceCompanyTagModalRef(component, new AceCompanyTag());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    aceCompanyTagModalRef(component: Component, aceCompanyTag: AceCompanyTag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.aceCompanyTag = aceCompanyTag;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
