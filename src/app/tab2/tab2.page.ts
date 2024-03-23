import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../shared/services/insurance.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
	imagePath: string = '';
	emptyImagPath: string =
		'../../assets/vecteezy_album-icon-with-outline-style_20579274.jpg';

	constructor(public _insuranceService: InsuranceService) {}

	ngOnInit(): void {
		this._insuranceService.getAll();
		this.imagePath = this.emptyImagPath;
	}

	onWillDismiss(event: any): void {}
}
