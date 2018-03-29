import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BundleGroup } from './bundle-group.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BundleGroup>;

@Injectable()
export class BundleGroupService {

    private resourceUrl =  SERVER_API_URL + 'api/bundle-groups';

    constructor(private http: HttpClient) { }

    create(bundleGroup: BundleGroup): Observable<EntityResponseType> {
        const copy = this.convert(bundleGroup);
        return this.http.post<BundleGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bundleGroup: BundleGroup): Observable<EntityResponseType> {
        const copy = this.convert(bundleGroup);
        return this.http.put<BundleGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BundleGroup>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BundleGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<BundleGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BundleGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BundleGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BundleGroup[]>): HttpResponse<BundleGroup[]> {
        const jsonResponse: BundleGroup[] = res.body;
        const body: BundleGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BundleGroup.
     */
    private convertItemFromServer(bundleGroup: BundleGroup): BundleGroup {
        const copy: BundleGroup = Object.assign({}, bundleGroup);
        return copy;
    }

    /**
     * Convert a BundleGroup to a JSON which can be sent to the server.
     */
    private convert(bundleGroup: BundleGroup): BundleGroup {
        const copy: BundleGroup = Object.assign({}, bundleGroup);
        return copy;
    }
}
