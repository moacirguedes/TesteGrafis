using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspNetWebApi.Models
{
    [Table("Pedido")]
    public class Pedido : BaseModelo
    {
        [Required]
        public DateTime Data { get; set; }

        [Required]
        public List<Produto> Produtos { get; set; }

        [Required]
        public Cliente Cliente { get; set; }

        [Required]
        public double Valor { get; set;}

        public double Desconto { get; set; }

        [Required]
        public double ValorTotal { get; set; }
    }
}