import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

class NovoProduto {
	public IdContato: number;
	public Descricao: string;
	public Imagem: File;
}

@Component({
	selector: 'app-cadastro-produto',
	templateUrl: './cadastro-produto.component.html',
	styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

	form: FormGroup;

	imagem: File;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
		this.form = this.formBuilder.group({
			descricao: ['', Validators.required],
			valor: ['', Validators.compose([Validators.required, Validators.min(1)])],
			imagem: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	onFileChanged(event) {
		this.imagem = event.target.files[0]
	}

	onSubmit() {

		if (this.form.invalid) {
			return;
		}

		let novoProduto = this.form.value as NovoProduto;

		this.http.post('http://localhost:49493/api/produtos/', JSON.stringify(novoProduto), this.httpOptions)
			.subscribe(result => {

				const uploadImagem = new FormData();
				uploadImagem.append(result.toString(), this.imagem);

				this.http.post('http://localhost:49493/api/imagem/', uploadImagem)
					.subscribe(data => {
						this.router.navigate(['produtos']);
					}, error => {
						console.log('Error', error);
					});
			});

	}

}
