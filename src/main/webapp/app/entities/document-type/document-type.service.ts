import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DocumentType } from './document-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentType>;

@Injectable()
export class DocumentTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/document-types';

    constructor(private http: HttpClient) { }

    create(documentType: DocumentType): Observable<EntityResponseType> {
        const copy = this.convert(documentType);
        return this.http.post<DocumentType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documentType: DocumentType): Observable<EntityResponseType> {
        const copy = this.convert(documentType);
        return this.http.put<DocumentType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentType[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentType[]>): HttpResponse<DocumentType[]> {
        const jsonResponse: DocumentType[] = res.body;
        const body: DocumentType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentType.
     */
    private convertItemFromServer(documentType: DocumentType): DocumentType {
        const copy: DocumentType = Object.assign({}, documentType);
        return copy;
    }

    /**
     * Convert a DocumentType to a JSON which can be sent to the server.
     */
    private convert(documentType: DocumentType): DocumentType {
        const copy: DocumentType = Object.assign({}, documentType);
        return copy;
    }
}
