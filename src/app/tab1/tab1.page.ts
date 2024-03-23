import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InsuranceService } from '../shared/services/insurance.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, AfterViewInit {
	constructor(public _insuranceService: InsuranceService) {}

	ngOnInit(): void {
		this._insuranceService.getMostPopular();
	}

	ngAfterViewInit(): void {
		throw new Error('Method not implemented.');
	}
}
