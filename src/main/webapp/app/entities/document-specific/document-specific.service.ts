import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DocumentSpecific } from './document-specific.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentSpecific>;

@Injectable()
export class DocumentSpecificService {

    private resourceUrl =  SERVER_API_URL + 'api/document-specifics';

    constructor(private http: HttpClient) { }

    create(documentSpecific: DocumentSpecific): Observable<EntityResponseType> {
        const copy = this.convert(documentSpecific);
        return this.http.post<DocumentSpecific>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documentSpecific: DocumentSpecific): Observable<EntityResponseType> {
        const copy = this.convert(documentSpecific);
        return this.http.put<DocumentSpecific>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentSpecific>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentSpecific[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentSpecific[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentSpecific[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentSpecific = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentSpecific[]>): HttpResponse<DocumentSpecific[]> {
        const jsonResponse: DocumentSpecific[] = res.body;
        const body: DocumentSpecific[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentSpecific.
     */
    private convertItemFromServer(documentSpecific: DocumentSpecific): DocumentSpecific {
        const copy: DocumentSpecific = Object.assign({}, documentSpecific);
        return copy;
    }

    /**
     * Convert a DocumentSpecific to a JSON which can be sent to the server.
     */
    private convert(documentSpecific: DocumentSpecific): DocumentSpecific {
        const copy: DocumentSpecific = Object.assign({}, documentSpecific);
        return copy;
    }
}
