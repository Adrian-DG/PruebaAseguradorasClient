import { isDevMode } from '@angular/core';
import { environment as dev } from 'src/environments/environment';
import { environment as prod } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iinsurance } from '../entities/iinsurance.entity';

@Injectable({
	providedIn: 'root',
})
export class InsuranceService {
	private endPoint: string = '';

	private mostPopularSource = new BehaviorSubject<string[]>([]);
	public mostPopular$ = this.mostPopularSource.asObservable();

	private insuranceSource = new BehaviorSubject<Iinsurance[]>([]);
	public insurance$ = this.insuranceSource.asObservable();

	constructor(private $http: HttpClient) {
		this.endPoint += `${
			isDevMode() ? dev.api_url : prod.api_url
		}/insurance`;
	}

	getMostPopular(): void {
		this.$http
			.get<string[]>(`${this.endPoint}/most-popular`)
			.subscribe((response: string[]) => {
				this.mostPopularSource.next(response);
			});
	}
}
