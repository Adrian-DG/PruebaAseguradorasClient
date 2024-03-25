import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-insurace-card',
	templateUrl: './insurace-card.component.html',
	styleUrls: ['./insurace-card.component.scss'],
})
export class InsuraceCardComponent implements OnInit {
	@Input() item!: { id: number; name: string; logo: string };
	@Output() editItemEvent!: EventEmitter<{
		id: number;
		name: string;
		logo: string;
	}>;
	constructor() {}

	ngOnInit() {}

	updateItem(value: { id: number; name: string; logo: string }) {
		this.editItemEvent.emit(value);
	}
}
