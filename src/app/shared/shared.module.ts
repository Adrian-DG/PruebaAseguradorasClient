import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [MainToolbarComponent],
	imports: [CommonModule, IonicModule, HttpClientModule],
	exports: [MainToolbarComponent],
})
export class SharedModule {}
