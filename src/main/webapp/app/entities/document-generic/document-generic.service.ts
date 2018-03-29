import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DocumentGeneric } from './document-generic.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentGeneric>;

@Injectable()
export class DocumentGenericService {

    private resourceUrl =  SERVER_API_URL + 'api/document-generics';

    constructor(private http: HttpClient) { }

    create(documentGeneric: DocumentGeneric): Observable<EntityResponseType> {
        const copy = this.convert(documentGeneric);
        return this.http.post<DocumentGeneric>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documentGeneric: DocumentGeneric): Observable<EntityResponseType> {
        const copy = this.convert(documentGeneric);
        return this.http.put<DocumentGeneric>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentGeneric>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentGeneric[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentGeneric[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentGeneric[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentGeneric = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentGeneric[]>): HttpResponse<DocumentGeneric[]> {
        const jsonResponse: DocumentGeneric[] = res.body;
        const body: DocumentGeneric[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentGeneric.
     */
    private convertItemFromServer(documentGeneric: DocumentGeneric): DocumentGeneric {
        const copy: DocumentGeneric = Object.assign({}, documentGeneric);
        return copy;
    }

    /**
     * Convert a DocumentGeneric to a JSON which can be sent to the server.
     */
    private convert(documentGeneric: DocumentGeneric): DocumentGeneric {
        const copy: DocumentGeneric = Object.assign({}, documentGeneric);
        return copy;
    }
}
