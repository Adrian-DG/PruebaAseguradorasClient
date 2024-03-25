import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { InsuranceService } from '../shared/services/insurance.service';
import { InsuraceCardComponent } from './components/insurace-card/insurace-card.component';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ExploreContainerComponentModule,
		Tab2PageRoutingModule,
		SharedModule,
		HttpClientModule,
		FormsModule,
	],
	declarations: [Tab2Page, InsuraceCardComponent],
	providers: [InsuranceService],
})
export class Tab2PageModule {}
