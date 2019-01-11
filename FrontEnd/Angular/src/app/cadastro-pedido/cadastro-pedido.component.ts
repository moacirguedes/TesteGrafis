import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

class NovoPedido {
	public Data: Date;
	public Valor: number;
	public Desconto: number;
	public ValorTotal: number;
}

class Produto {
	public Id: number;
	public Descricao: string;
	public Valor: number;
}

class Cliente {
	public Id: number;
	public Nome: string;
}

@Component({
	selector: 'app-cadastro-pedido',
	templateUrl: './cadastro-pedido.component.html',
	styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

	form: FormGroup;

	clientes: Cliente[] = [];

	produtos: Produto[] = [];

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
		this.form = this.formBuilder.group({
			desconto: ['']
		});
	}

	ngOnInit() {
		this.http.get<Cliente[]>('http://localhost:49493/api/clientes/')
			.subscribe(x => this.clientes = x);

		this.http.get<Produto[]>('http://localhost:49493/api/produtos/')
			.subscribe(x => this.produtos = x);
	}

	onSubmit() {

		if (this.form.invalid) {
			return;
		}

		let novoPedido = this.form.value as NovoPedido;

		this.http.post('http://localhost:49493/api/pedidos/', JSON.stringify(novoPedido), this.httpOptions)
			.subscribe(data => {
				this.router.navigate(['pedidos']);
			}, error => {
				console.log('Error', error);
			});

	}
}


