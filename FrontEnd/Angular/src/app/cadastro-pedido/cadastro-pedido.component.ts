import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DISABLED } from '@angular/forms/src/model';
import { forEach } from '@angular/router/src/utils/collection';
import { containsElement } from '@angular/animations/browser/src/render/shared';

class NovoPedido {
	public Data: Date;
	public IdCliente: number;
	public IdProdutos: number[];
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
			desconto: ['0', Validators.min(0)],
			idCliente: ['', Validators.required],
			idProdutos: ['', Validators.required],
			valor: [{ value: '0', disabled: true }, Validators.required],
			valorTotal: [{ value: '0', disabled: true }, Validators.required]
		});
	}

	ngOnInit() {
		this.http.get<Cliente[]>('http://localhost:49493/api/clientes/')
			.subscribe(x => this.clientes = x);

		this.http.get<Produto[]>('http://localhost:49493/api/produtos/')
			.subscribe(x => this.produtos = x);
	}

	sum(event) {
		let valorParcial = 0;

		this.produtos.forEach(function (p) {
			if (event.value.indexOf(p.Id.toString()) >= 0) {
				valorParcial += p.Valor;
			}
		});

		this.form.controls['valor'].setValue(valorParcial);

		valorParcial -= this.form.controls['desconto'].value;

		this.form.controls['valorTotal'].setValue(valorParcial < 0 ? 0 : valorParcial);
	}

	applyDiscount() {
		let valorTotal = this.form.controls['valor'].value - this.form.controls['desconto'].value;

		this.form.controls['valorTotal'].setValue(valorTotal < 0 ? 0 : valorTotal);
	}

	onSubmit() {

		if (this.form.invalid) {
			return;
		}

		let novoPedido = this.form.getRawValue() as NovoPedido;

		this.http.post('http://localhost:49493/api/pedidos/', JSON.stringify(novoPedido), this.httpOptions)
			.subscribe(data => {
				this.router.navigate(['pedidos']);
			}, error => {
				console.log('Error', error);
			});
	}
}


