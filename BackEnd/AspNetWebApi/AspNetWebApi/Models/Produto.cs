using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspNetWebApi.Models
{
    [Table("Produto")]
    public class Produto : BaseModelo
    {
        [Required]
        public string Descricao { get; set; }

        [Required]
        public double Valor { get; set; }
    }

}