/// <reference types="Cypress" />

class CompraPage {
  acessarSite() {
    cy.visit('/');
  };

  adicionarProdutoCarrinho(produto) {
    cy.contains(produto).trigger('mouseover');

    cy.contains(produto)
      .parent()
      .siblings('div.button-container')
      .children('a')
      .first()
      .click()
  };

  verificarSeProdutoFoiAdicionadoAoCarrinho() {
    cy.get('.icon-ok')
      .parent()
      .should('contain.text', 'Product successfully added to your shopping cart');
  }

  verificarProdutoAdicionadoCarrinho(produto) {
    cy.get('span#layer_cart_product_title').should('contain.text', produto);
  }

  continuarCheckout() {
    cy.get(".button-container a[href$='controller=order']").click();
  }

  prosseguirCompra() {
    cy.get(".cart_navigation a[href$='order&step=1']").click();
  }

  efetuarLogin(email, senha) {
    cy.get('#email').type(email);
    cy.get('#passwd').type(senha);
    cy.get('button#SubmitLogin').click();
  }

  verificarEnderecoEntregaIgualCobranca() {
    cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'checked', 'checked');
    cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'name', 'same');
  }

  confirmarEnderecoEntrega() {
    cy.get('button[name=processAddress]').click();
  }

  aceitarTermosServico() {
    cy.get('[type=checkbox]#cgv').check();
    cy.get('button[name=processCarrier]').click();
  }

  selecionarFormaPagamento() {
    cy.get('.bankwire').click();

    cy.get('.cart_navigation button[type=submit]')
      .find('span')
      .contains('I confirm my order')
      .click();
  }

  verificarCompraEfetuada() {
    cy.get('.cheque-indent strong')
      .should('contain.text', 'Your order on My Store is complete.');
  }

  verificarIDCompra() {
    cy.get('div.box').invoke('text').then((text) => {
      cy.writeFile('cypress/fixtures/pedido.json', { id: `${text.match(/[A-Z][A-Z]+/g)[1]}` });
    });
    cy.get(".cart_navigation a[href$='history']").click();
    cy.readFile('cypress/fixtures/pedido.json').then((pedido) => {
      cy.get('tr.first_item .history_link a').should('contain.text', pedido.id)
    });
  }
}

export const compraPage = new CompraPage();