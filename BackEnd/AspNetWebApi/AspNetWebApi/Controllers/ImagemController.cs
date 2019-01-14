using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace AspNetWebApi.Controllers
{
    public class ImagemController : ApiController
    {

        [Route("api/imagem")]
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Post()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {
                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            return Request.CreateResponse(HttpStatusCode.BadRequest, "Utilize formato de imagem do tipo .jpg ou .png");
                        }
                        else
                        {
                            var filePath = HttpContext.Current.Server.MapPath("~/Produtos/" + httpRequest.Files.Keys[0] + ".jpg");

                            postedFile.SaveAs(filePath);
                        }
                    }

                    return Request.CreateErrorResponse(HttpStatusCode.Created, "Imagem enviada");
                }
                return Request.CreateResponse(HttpStatusCode.NotFound, "Por favor selecione uma imagem");
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [HttpGet]
        [Route("api/imagem/{id}")]
        public HttpResponseMessage Get(long id)
        {
            var path = HttpContext.Current.Server.MapPath("~/Produtos/" + id + ".jpg");

            HttpResponseMessage response = new HttpResponseMessage();

            response.Content = new StreamContent(new FileStream(path, FileMode.Open, FileAccess.Read));

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png"); // or jpg, gif..

            return response;
        }
    }
}
