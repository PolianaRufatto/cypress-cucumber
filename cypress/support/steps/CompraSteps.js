/* global Given, Then, When */

const { compraPage } = require("../pages/CompraPage");

Given('que eu esteja na tela inicial', () => {
  compraPage.acessarSite();
});

Given('adicione um produto ao carrinho', () => {
  compraPage.adicionarProdutoCarrinho('Faded Short Sleeve T-shirts');
  compraPage.verificarSeProdutoFoiAdicionadoAoCarrinho();
  compraPage.verificarProdutoAdicionadoCarrinho('Faded Short Sleeve T-shirts')
});

When('continuar com o checkout', () => {
  compraPage.continuarCheckout();
});

When('prosseguir com a compra', () => {
  compraPage.prosseguirCompra();
});

When('efetuar login', () => {
  compraPage.efetuarLogin('testecypress@mail.com', '54321')
});

When('confirmar o endereço de entrega', () => {
  compraPage.verificarEnderecoEntregaIgualCobranca();
  compraPage.confirmarEnderecoEntrega();
});

When('confirmar os termos de serviço', () => {
  compraPage.aceitarTermosServico();
});

When('selecionar a forma de pagamento', () => {
  compraPage.selecionarFormaPagamento();
});

Then('deve ser efetuada a compra do produto', () => {
  compraPage.verificarCompraEfetuada();
  compraPage.verificarIDCompra();
});