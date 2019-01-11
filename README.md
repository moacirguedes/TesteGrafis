# TesteAngularWebApi
Teste para vaga de emprego, utilizando Angular e ASP.NET Web API.

Gostaria de trabalhar conosco? Clone esse repositório, siga as instruções abaixo para ter o seu projeto funcionando e construa as funcionalidades requeridas no teste.

Não necessarimanete todas as funcionalidades precisam ser construídas, caso você chegue no seu limite e não consiga prosseguir, traga o que conseguiu fazer para ser avaliado. Mas caso consiga construir todas as funcionalidades requeridas, meus parabéns, isso mostra que você tem pleno domínio das tecnologias envolvidas e logicamente isso conta muito na avaliação.

Faça o teste e mostre até onde consegue chegar. Ficaremos felizes em tê-lo em nossa equipe! :smile:


## Você vai precisar ter instalado

- IDE do Visual Studio Community 2017 www.visualstudio.microsoft.com
    - Na instalação, quando aparecer a tela para selecionar as cargas de trabalho, selecione apenas a opção ASP.NET e desenvolvimento Web.
- Visual Studio Code www.visualstudio.microsoft.com
- .NET Developer Pack 4.7.1 https://www.microsoft.com/en-us/download/details.aspx?id=56119
- Node www.nodejs.org
- Angular CLI https://cli.angular.io/

ps: tudo em ambiente Windows.

## Tecnologias e linguagens que são utilizadas nesse projeto

#### Back-end
- ASP.NET Web API (linguagem c#) https://www.asp.net/web-api
- Banco de dados SQL Server Compact https://technet.microsoft.com/en-us/library/ms173994(v=sql.110).aspx
- Entity Framework https://docs.microsoft.com/pt-br/ef/#pivot=ef6x&panel=ef6x1

#### Front-end
- Angular https://www.angular.io/
- Angular Material https://www.material.angular.io/


## Como começar

1. Faça o clone do repositório, abra um Prompt de comando e entre na pasta do projeto do Angular (../TesteAngularWebApi/FrontEnd/Angular), execute comando "npm install" (sem as aspas) para que as dependências sejam instaladas.

2. Utilizando o Visual Studio Code, abra a pasta do projeto do Angular (../TesteAngularWebApi/FrontEnd/Angular). É com o Visual Studio Code que você construirá o Front-end da aplicação.

3. Utilizando a IDE Visual Studio, vá em File > Open > Project/Solution e selecione o arquivo conhecido como a solution do projeto (../TesteAngularWebApi/BackEnd/AspNetWebApi/AspNetWebApi.sln). Isso vai abrir o projeto ASP.NET Web API. É com essa IDE que você construirá o seu Back-end.

4. Utilizando a IDE Visual Studio, inicie o serviço Web API apertando F5. Isso vai iniciar todo o serviço e abrir uma página web que exibe uma mensagem de erro padrão, não se preocupe. Acesse o endereço http://localhost:49493/api/contatos/ e se tudo estiver correto você deve receber uma resposta no formato JSON. Lembre-se de ter esse serviço rodando quando quiser testar o Front-end.

5. Utilizando um Prompt de comando, entre na pasta do projeto Angular (../TesteAngularWebApi/FrontEnd/Angular) e execute o comando "ng serve" (sem aspas). Isso vai iniciar o serviço do node, que contém a página do Front-end em Angular. Quando o serviço estiver inicializado acesse o endereço http://localhost:4200/, se tudo estiver correto você vai ver a página web que já está construída como exemplo.

6. Já existe um exemplo em pleno funcionamento dentro desses projetos, é algo bem simples, onde você pode cadastrar um Contato e cada Contato pode ter várias Mensagens cadastradas. Apesar de simples, o exemplo é suficiente para demonstrar como as coisas funcionam, então talvez você deva investigar os códigos existentes antes de tentar construir alguma coisa.

7. Caso você receba a seguinte mensagem de erro na IDE do Visual Studio: "The model backing the 'Contexto' context has changed since the database was created. Consider using Code First Migrations to update the database"; Você provavelmente deve ter alterado ou criado um ou mais modelos. Deste modo você deve utilizar o Entity Framework para fazer a migração do banco de dados:

    7.1. Abra o Package Manager Console na IDE do Visual Studio. (Exibir > Outras janelas > Console do gerenciador de pacotes)
        
    7.2. Execute o comando "update-database -verbose" (sem aspas) nesse terminal.
        
    7.3. Caso você ainda tenha mensagens de erro, delete o arquivo do banco de dados (../TesteAngularWebApi/BackEnd/AspNetWebApi/AspNetWebApi/App_Data/Dados.sdf) e execute o comando novamente.
        
    7.4. Se mesmo deletando o arquivo do banco de dados você continuar obtendo erros, é a sua alteração causou alguma mudança que o Entity Framework não consegue mapear. Investigue o erro e o seu código ou clone novamente o repositório para tentar novamente.

8. Boa sorte! Estamos na torcida para que você conclua o teste e mostre todo seu potencial. Caso, tenha alguma dificuldade fique a vontade para nos contatar, mas lembre-se, a internet é um mar de conhecimento. :surfer:


## Teste

#### Cenário
Um cliente chega à loja para fazer uma compra. Nessa compra um ou vários produtos estão envolvidos. Você como atendente deve cadastrar esse cliente e registrar a venda dos produtos escolhidos, comunicando o cliente o valor total da compra.

#### Entidades envolvidas (modelos)
Analisando o cenário à cima, facilmente identifican-se as entidades com as quais se deve trabalhar, são elas:
- Cliente
- Produto
- Pedido

#### Funcionalidades esperadas
- Cadastro de clientes, com os campos:
  
    - Nome (obrigatório)
    - E-mail (obrigatório e único, pois não pode existir mais de um cadastro com o mesmo e-mail)

- Cadastro de produtos, com os campos: 

    - Descrição (obrigatório)
    - Valor (obrigatório e maior que zero, pois não faz sentido existir um produto com valor zero ou negativo)
    - Foto

- Cadastro do pedidos, com os campos: 

    - Número (obrigatório e sequêncial)
    - Data (obrigatório)
    - Produtos (obrigatório)
    - Cliente (obrigatório)
    - Valor (obrigatório)
    - Desconto
    - ValorTotal (obrigatório).
    
:sunglasses:
