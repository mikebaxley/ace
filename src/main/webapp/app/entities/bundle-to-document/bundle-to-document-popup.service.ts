import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BundleToDocument } from './bundle-to-document.model';
import { BundleToDocumentService } from './bundle-to-document.service';

@Injectable()
export class BundleToDocumentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bundleToDocumentService: BundleToDocumentService

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
                this.bundleToDocumentService.find(id)
                    .subscribe((bundleToDocumentResponse: HttpResponse<BundleToDocument>) => {
                        const bundleToDocument: BundleToDocument = bundleToDocumentResponse.body;
                        this.ngbModalRef = this.bundleToDocumentModalRef(component, bundleToDocument);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bundleToDocumentModalRef(component, new BundleToDocument());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bundleToDocumentModalRef(component: Component, bundleToDocument: BundleToDocument): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bundleToDocument = bundleToDocument;
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
