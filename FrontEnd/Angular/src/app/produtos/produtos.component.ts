import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageService } from '../image.service';
import { forEach } from '@angular/router/src/utils/collection';

class Produto {
	public Id: number;
	public Descricao: string;
	public Valor: number;
}

@Component({
	selector: 'app-produtos',
	templateUrl: './produtos.component.html',
	styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

	produtos: Produto[] = [];

	imagesToShow: any[] = [];

	constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private imageService: ImageService) { }

	ngOnInit() {
		this.http.get<Produto[]>('http://localhost:49493/api/produtos/')
			.subscribe(x => this.produtos = x);
	}

	getImageFromService(produto: Produto) {
		this.imageService.getImage(produto.Id.toString()).subscribe(data => {
			this.createImageFromBlob(produto.Id.toString(), data);
		}, error => {
			console.log(error);
		});
	}

	createImageFromBlob(id: string, image: Blob) {
		let reader = new FileReader();
		if (image) {
			reader.readAsDataURL(image);
		}
		reader.addEventListener("load", () => {
			this.imagesToShow[id] = reader.result;
		}, false);
	}

	newProduct() {
		this.router.navigate(['produtos/cadastro']);
	}
}


