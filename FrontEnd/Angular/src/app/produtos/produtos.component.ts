import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

class Produto {
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

	constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.http.get<Produto[]>('http://localhost:49493/api/produtos/')
			.subscribe(x => this.produtos = x);
	}

	novoProduto() {
		this.router.navigate(['produtos/cadastro']);
	}
}


