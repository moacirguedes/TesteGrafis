using AspNetWebApi.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AspNetWebApi.Controllers
{
    public class ClientesController : ApiController
    {
        public class Cliente
        {
            public long Id { get; set; }
            public string Nome { get; set; }
            public string Email { get; set; }
        }

        [HttpGet]
        public List<Cliente> Get()
        {
            using (var contexto = new Contexto())
            {
                var clientesModelo = contexto.Clientes.ToList();
                var clientesProxy = new List<Cliente>();

                foreach (var clienteModelo in clientesModelo)
                {
                    var clienteProxy = new Cliente()
                    {
                        Id = clienteModelo.Id,
                        Nome = clienteModelo.Nome,
                        Email = clienteModelo.Email
                    };

                    clientesProxy.Add(clienteProxy);
                }

                return clientesProxy;
            }
        }

        [HttpGet]
        public Cliente Get(long id)
        {
            using (var contexto = new Contexto())
            {
                var clienteModelo = contexto.Clientes
                    .Where(x => x.Id == id)
                    .Single();


                var clienteProxy = new Cliente()
                {
                    Id = clienteModelo.Id,
                    Nome = clienteModelo.Nome,
                    Email = clienteModelo.Email
                };

                return clienteProxy;
            }
        }

        public class NovoCliente
        {
            public string Nome { get; set; }
            public string Email { get; set; }
        }

        [HttpPost]
        public void Post(NovoCliente novoCliente)
        {
            using (var contexto = new Contexto())
            {
                var clienteModelo = new Models.Cliente()
                {
                    Nome = novoCliente.Nome,
                    Email = novoCliente.Email
                };

                contexto.Clientes.Add(clienteModelo);
                contexto.SaveChanges();
            }
        }
    }
}
