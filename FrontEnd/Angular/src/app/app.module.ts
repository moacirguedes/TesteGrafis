import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImports } from './MaterialImports';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CadastroPedidoComponent } from './cadastro-pedido/cadastro-pedido.component';
import { ImageService } from './image.service';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'clientes', component: ClientesComponent },
	{ path: 'clientes/cadastro', component: CadastroClienteComponent },
	{ path: 'clientes/:id/editar', component: EditarClienteComponent },
	{ path: 'produtos', component: ProdutosComponent },
	{ path: 'produtos/cadastro', component: CadastroProdutoComponent },
	{ path: 'pedidos', component: PedidosComponent },
	{ path: 'pedidos/cadastro', component: CadastroPedidoComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		CadastroClienteComponent,
		EditarClienteComponent,
		ClientesComponent,
		ProdutosComponent,
		CadastroProdutoComponent,
		PedidosComponent,
		CadastroPedidoComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
		BrowserAnimationsModule,
		MaterialImports,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [ImageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
