using AspNetWebApi.Context;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AspNetWebApi.Controllers
{
    public class ProdutosController : ApiController
    {
        public class Produto
        {
            public long Id { get; set; }
            public string Descricao { get; set; }
            public double Valor { get; set; }
        }

        [HttpGet]
        public List<Produto> Get()
        {
            using (var contexto = new Contexto())
            {
                var produtosModelo = contexto.Produtos.ToList();
                var produtosProxy = new List<Produto>();

                foreach (var produtoModelo in produtosModelo)
                {
                    var produtoProxy = new Produto()
                    {
                        Id = produtoModelo.Id,
                        Descricao = produtoModelo.Descricao,
                        Valor = produtoModelo.Valor
                    };

                    produtosProxy.Add(produtoProxy);
                }

                return produtosProxy;
            }
        }

        [HttpGet]
        public Produto Get(long id)
        {
            using (var contexto = new Contexto())
            {
                var produtoModelo = contexto.Produtos
                    .Where(x => x.Id == id)
                    .Single();


                var produtoProxy = new Produto()
                {
                    Id = produtoModelo.Id,
                    Descricao = produtoModelo.Descricao,
                    Valor = produtoModelo.Valor
                };

                return produtoProxy;
            }
        }

        public class NovoProduto
        {
            public string Descricao { get; set; }
            public double Valor { get; set; }
        }

        [HttpPost]
        public HttpResponseMessage Post(NovoProduto novoProduto)
        {
            using (var contexto = new Contexto())
            {
                var produtoModelo = new Models.Produto()
                {
                    Descricao = novoProduto.Descricao,
                    Valor = novoProduto.Valor
                };

                contexto.Produtos.Add(produtoModelo);
                contexto.SaveChanges();
                
                return Request.CreateResponse(HttpStatusCode.OK, produtoModelo.Id);
            }
        }
    }
}
