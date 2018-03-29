import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DocumentGeneric } from './document-generic.model';
import { DocumentGenericService } from './document-generic.service';

@Injectable()
export class DocumentGenericPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private documentGenericService: DocumentGenericService

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
                this.documentGenericService.find(id)
                    .subscribe((documentGenericResponse: HttpResponse<DocumentGeneric>) => {
                        const documentGeneric: DocumentGeneric = documentGenericResponse.body;
                        this.ngbModalRef = this.documentGenericModalRef(component, documentGeneric);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentGenericModalRef(component, new DocumentGeneric());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentGenericModalRef(component: Component, documentGeneric: DocumentGeneric): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.documentGeneric = documentGeneric;
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
