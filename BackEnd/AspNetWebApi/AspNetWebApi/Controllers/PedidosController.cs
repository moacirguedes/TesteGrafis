using AspNetWebApi.Context;
using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;

namespace AspNetWebApi.Controllers
{
    public class PedidosController : ApiController
    {
        public class Pedido
        {
            public long Id { get; set; }
            public DateTime Data { get; set; }
            public List<Models.Produto> Produtos { get; set; }
            public Models.Cliente Cliente { get; set; }
            public double Valor { get; set; }
            public double Desconto { get; set; }
            public double ValorTotal { get; set; }
        }

        [HttpGet]
        public List<Pedido> Get()
        {
            using (var db = new Contexto())
            {
                var pedidosModelo = db.Pedidos
                    .Include(x => x.Cliente)
                    .Include(x => x.Produtos)
                    .ToList();

                var pedidosProxy = new List<Pedido>();

                foreach (var pedidoModelo in pedidosModelo)
                {
                    var pedidoProxy = new Pedido()
                    {
                        Id = pedidoModelo.Id,
                        Data = pedidoModelo.Data,
                        Produtos = pedidoModelo.Produtos,
                        Cliente = pedidoModelo.Cliente,
                        Valor = pedidoModelo.Valor,
                        Desconto = pedidoModelo.Desconto,
                        ValorTotal = pedidoModelo.ValorTotal
                    };

                    pedidosProxy.Add(pedidoProxy);
                }

                return pedidosProxy;
            }
        }

        [HttpGet]
        public Pedido Get(long id)
        {
            using (var db = new Contexto())
            {
                var pedidoModelo = db.Pedidos
                    .Include(x => x.Cliente)
                    .Include(x => x.Produtos)
                    .Where(x => x.Id == id)
                    .Single();
                
                var pedidoProxy = new Pedido()
                {
                    Id = pedidoModelo.Id,
                    Data = pedidoModelo.Data,
                    Produtos = pedidoModelo.Produtos,
                    Cliente = pedidoModelo.Cliente,
                    Valor = pedidoModelo.Valor,
                    Desconto = pedidoModelo.Desconto,
                    ValorTotal = pedidoModelo.ValorTotal
                }; 

                return pedidoProxy;
            }
        }

        public class NovoPedido
        {
            public DateTime Data { get; set; }
            public List<long> IdProdutos { get; set; }
            public long IdCliente { get; set; }
            public double Valor { get; set; }
            public double Desconto { get; set; }
            public double ValorTotal { get; set; }
        }

        [HttpPost]
        public void Post(NovoPedido novoPedido)
        {
            using (var db = new Contexto())
            {
                var clienteModelo = db.Clientes.Where(x => x.Id == novoPedido.IdCliente).Single();

                var produtosModelo = new List<Models.Produto>();

                foreach (var produto in novoPedido.IdProdutos)
                {
                    produtosModelo.Add(db.Produtos.Where(x => x.Id == produto).Single());
                }

                var pedidoModelo = new Models.Pedido()
                {
                    Data = DateTime.Now,
                    Produtos = produtosModelo,
                    Cliente = clienteModelo,
                    Valor = novoPedido.Valor,
                    Desconto = novoPedido.Desconto,
                    ValorTotal = novoPedido.ValorTotal
                };

                db.Pedidos.Add(pedidoModelo);
                db.SaveChanges();
            }
        }

    }
}