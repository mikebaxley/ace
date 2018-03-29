import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DocumentState } from './document-state.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentState>;

@Injectable()
export class DocumentStateService {

    private resourceUrl =  SERVER_API_URL + 'api/document-states';

    constructor(private http: HttpClient) { }

    create(documentState: DocumentState): Observable<EntityResponseType> {
        const copy = this.convert(documentState);
        return this.http.post<DocumentState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documentState: DocumentState): Observable<EntityResponseType> {
        const copy = this.convert(documentState);
        return this.http.put<DocumentState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentState>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentState[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentState[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentState[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentState = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentState[]>): HttpResponse<DocumentState[]> {
        const jsonResponse: DocumentState[] = res.body;
        const body: DocumentState[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentState.
     */
    private convertItemFromServer(documentState: DocumentState): DocumentState {
        const copy: DocumentState = Object.assign({}, documentState);
        return copy;
    }

    /**
     * Convert a DocumentState to a JSON which can be sent to the server.
     */
    private convert(documentState: DocumentState): DocumentState {
        const copy: DocumentState = Object.assign({}, documentState);
        return copy;
    }
}
