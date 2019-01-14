import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

class Cliente {
	public Id: number;
	public Nome: string;
	public Email: string;
}

@Component({
	selector: 'app-editar-cliente',
	templateUrl: './editar-cliente.component.html',
	styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

	form: FormGroup;

	idCliente: number;

	cliente: Cliente;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
		this.form = this.formBuilder.group({
			nome: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});

		this.idCliente = this.activatedRoute.snapshot.params['id'];
	}

	ngOnInit() {
		this.http.get<Cliente>('http://localhost:49493/api/clientes/' + this.idCliente)
			.subscribe(x => this.cliente = x);
	}

	edit() {

		if (this.form.invalid) {
			return;
		}

		let clienteAtualizado = this.form.value as Cliente;

		this.http.put('http://localhost:49493/api/clientes/' + this.idCliente + '/editar', JSON.stringify(clienteAtualizado), this.httpOptions)
			.subscribe(data => {
				this.router.navigate(['clientes']);
			}, error => {
				console.log('Error', error);
			});
	}

	delete() {
		this.http.delete('http://localhost:49493/api/clientes/' + this.idCliente + '/editar', this.httpOptions)
			.subscribe(data => {
				this.router.navigate(['clientes']);
			}, error => {
				console.log('Error', error);
			});
	}

}
