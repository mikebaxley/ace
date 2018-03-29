import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BundleToDocument } from './bundle-to-document.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BundleToDocument>;

@Injectable()
export class BundleToDocumentService {

    private resourceUrl =  SERVER_API_URL + 'api/bundle-to-documents';

    constructor(private http: HttpClient) { }

    create(bundleToDocument: BundleToDocument): Observable<EntityResponseType> {
        const copy = this.convert(bundleToDocument);
        return this.http.post<BundleToDocument>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bundleToDocument: BundleToDocument): Observable<EntityResponseType> {
        const copy = this.convert(bundleToDocument);
        return this.http.put<BundleToDocument>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BundleToDocument>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BundleToDocument[]>> {
        const options = createRequestOption(req);
        return this.http.get<BundleToDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BundleToDocument[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BundleToDocument = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BundleToDocument[]>): HttpResponse<BundleToDocument[]> {
        const jsonResponse: BundleToDocument[] = res.body;
        const body: BundleToDocument[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BundleToDocument.
     */
    private convertItemFromServer(bundleToDocument: BundleToDocument): BundleToDocument {
        const copy: BundleToDocument = Object.assign({}, bundleToDocument);
        return copy;
    }

    /**
     * Convert a BundleToDocument to a JSON which can be sent to the server.
     */
    private convert(bundleToDocument: BundleToDocument): BundleToDocument {
        const copy: BundleToDocument = Object.assign({}, bundleToDocument);
        return copy;
    }
}
