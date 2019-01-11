import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

class Pedido {
    public Id: number;
    public Data: Date;
	public Valor: number;
    public Desconto: number;
    public ValorTotal: number;
}

class Produto {
	public Descricao: string;
	public Valor: number;
}

class Cliente {
	public Id: number;
	public Nome: string;
}

@Component({
	selector: 'app-pedidos',
	templateUrl: './pedidos.component.html',
	styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

	pedidos: Pedido[] = [];

	constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.http.get<Pedido[]>('http://localhost:49493/api/pedidos/')
			.subscribe(x => this.pedidos = x);
	}

	novoPedido() {
		this.router.navigate(['pedidos/cadastro']);
	}
}


