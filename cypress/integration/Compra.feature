Feature: Compra

  Scenario: Efetuar uma compra de produto
   Given que eu esteja na tela inicial
      And adicione um produto ao carrinho
    When continuar com o checkout
      And prosseguir com a compra
        And efetuar login
          And confirmar o endereço de entrega
            And confirmar os termos de serviço
              And selecionar a forma de pagamento
    Then deve ser efetuada a compra do produto
     
   