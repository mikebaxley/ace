import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DocumentSpecific } from './document-specific.model';
import { DocumentSpecificService } from './document-specific.service';

@Injectable()
export class DocumentSpecificPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private documentSpecificService: DocumentSpecificService

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
                this.documentSpecificService.find(id)
                    .subscribe((documentSpecificResponse: HttpResponse<DocumentSpecific>) => {
                        const documentSpecific: DocumentSpecific = documentSpecificResponse.body;
                        this.ngbModalRef = this.documentSpecificModalRef(component, documentSpecific);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentSpecificModalRef(component, new DocumentSpecific());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentSpecificModalRef(component: Component, documentSpecific: DocumentSpecific): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.documentSpecific = documentSpecific;
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
