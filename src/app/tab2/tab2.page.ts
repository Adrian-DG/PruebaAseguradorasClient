import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceService } from '../shared/services/insurance.service';
import {
	Camera,
	CameraResultType,
	CameraSource,
	Photo,
} from '@capacitor/camera';
import {
	IonModal,
	SearchbarChangeEventDetail,
	SearchbarCustomEvent,
} from '@ionic/angular';
import { ICreateInsuranceDto } from '../shared/dto/icreate-insurance.dto';
import { OverlayEventDetail } from '@ionic/core/components';
import { Iinsurance } from '../shared/entities/iinsurance.entity';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
	@ViewChild(IonModal) formModal!: IonModal;
	newInsurance: ICreateInsuranceDto = {
		name: '',
		logo: '',
	};

	imageWebPath: string =
		'../../assets/vecteezy_album-icon-with-outline-style_20579274.jpg';
	imageBase64: string = '';

	isEditing: boolean = false;

	constructor(public _insuranceService: InsuranceService) {}

	ngOnInit(): void {
		this._insuranceService.getAll('');
	}

	onSearch(event: SearchbarCustomEvent): void {
		const value = event.detail.value ?? '';
		this._insuranceService.getAll(value);
	}

	cancel(): void {
		this.formModal.dismiss(null, 'cancel');
	}

	confirm(): void {
		this.newInsurance.logo = this.imageBase64;
		this.formModal.dismiss(this.newInsurance, 'confirm');
	}

	onWillDismiss(event: Event): void {
		const ev = event as CustomEvent<
			OverlayEventDetail<ICreateInsuranceDto>
		>;
		if (ev.detail.role === 'confirm') {
			const { name, logo } = ev.detail.data as ICreateInsuranceDto;
			console.log(logo);
			if (this.isEditing) {
				this.update();
			} else {
				this._insuranceService.create({ name: name, logo: logo });
			}
		}
	}

	private convertBlobToBase64 = (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = reject;
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.readAsDataURL(blob);
		});

	private async readAsBase64(photo: Photo) {
		const response = await fetch(photo.webPath!);
		const blob = await response.blob();
		return (await this.convertBlobToBase64(blob)) as string;
	}

	async pickImage(): Promise<void> {
		// const image = await Camera.pickImages({ limit: 1 });
		const image = await Camera.getPhoto({
			source: CameraSource.Photos,
			resultType: CameraResultType.Uri,
			correctOrientation: true,
			presentationStyle: 'fullscreen',
			webUseInput: true,
		});

		this.imageWebPath =
			image?.webPath ??
			'../../assets/vecteezy_album-icon-with-outline-style_20579274.jpg';
		this.imageBase64 = await this.readAsBase64(image);
	}

	async editInsurace(value: {
		id: number;
		name: string;
		logo: string;
	}): Promise<void> {
		this.imageWebPath = value.logo;
		this.newInsurance = {
			id: value.id,
			name: value.name,
			logo: value.logo,
		};
		this.isEditing = true;
		await this.formModal.present();
	}

	update(): void {
		const { id, name, logo } = this.newInsurance;
		this._insuranceService
			.updateInsurance({ id: id as number, name: name, logo: logo })
			.subscribe(async (response: Iinsurance) => {
				await this.formModal.dismiss();
				this.isEditing = false;
				this._insuranceService.getAll('');
			});
	}
}
