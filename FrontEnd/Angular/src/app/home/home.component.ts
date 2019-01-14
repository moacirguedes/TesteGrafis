import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() { }

	clients() {
		this.router.navigate(['clientes']);
	}

	orders() {
		this.router.navigate(['pedidos']);
	}

	products() {
		this.router.navigate(['produtos']);
	}

}


