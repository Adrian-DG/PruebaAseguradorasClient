import { isDevMode } from '@angular/core';
import { environment as dev } from 'src/environments/environment';
import { environment as prod } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iinsurance } from '../entities/iinsurance.entity';
import { ICreateInsuranceDto } from '../dto/icreate-insurance.dto';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class InsuranceService {
	private endPoint: string = '';

	private mostPopularSource = new BehaviorSubject<
		{ name: true; logo: true }[]
	>([]);
	public mostPopular$ = this.mostPopularSource.asObservable();

	private insuranceSource = new BehaviorSubject<Iinsurance[]>([]);
	public insurance$ = this.insuranceSource.asObservable();

	constructor(private $http: HttpClient, private _alert: AlertController) {
		this.endPoint += `${
			isDevMode() ? dev.api_url : prod.api_url
		}/insurance`;

		console.log(this.endPoint);
	}

	getMostPopular(): void {
		this.$http
			.get<{ name: true; logo: true }[]>(`${this.endPoint}/most-popular`)
			.subscribe((response: { name: true; logo: true }[]) => {
				this.mostPopularSource.next(response);
			});
	}

	getAll(searchTerm: string): void {
		const params = new HttpParams().set('searchTerm', searchTerm);
		this.$http
			.get<Iinsurance[]>(this.endPoint, { params: params })
			.subscribe((data: Iinsurance[]) => {
				this.insuranceSource.next(data);
			});
	}

	create(insuranceDto: ICreateInsuranceDto): void {
		this.$http
			.post<Iinsurance>(this.endPoint, insuranceDto)
			.subscribe((response: Iinsurance) => {
				this._alert.create({
					header: 'Exito',
					subHeader: 'Nueva aseguradora',
					message: 'Se han guardado los cambios',
					translucent: true,
				});
			});
	}

	updateInsurance(model: { id: number; name: string; logo: string }) {
		return this.$http.put<Iinsurance>(`${this.endPoint}/${model.id}`, {
			name: model.name,
			logo: model.logo,
		});
	}
}
