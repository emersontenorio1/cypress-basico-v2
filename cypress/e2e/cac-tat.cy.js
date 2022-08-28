///'<reference typess="Cypress"/>'
    describe('Central de Atendimetno ao Cliente TAT',() => {
        beforeEach(()=>{
            cy.visit("../../src/index.html");


        })

    it('Verificar o titulo da Aplicação', () => {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    });
    it('Preenche os campos obrigatorios e envia o formulário', () => {
        const longText = 'Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, Testes, '
        cy.get('#firstName').type('Emerson');
        cy.get('#lastName').type('B Tenório');
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('[class="button"]').click();
        cy.get('.success').should('be.visible');


    });


    it('exibe mensagem de erro ao submeter o formulário com email com formatação invalida', () => {
        cy.get('#firstName').type('Emerson');
        cy.get('#lastName').type('B Tenório');
        cy.get('#email').type('exemplo@exemplo,com');
        cy.get('#open-text-area').type('teste');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio quando preenchido com valo não númerico', () => {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Emerson');
        cy.get('#lastName').type('B Tenório');
        cy.get('#email').type('exemplo@exemplo.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('test');
        cy.get('[class="button"]').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .type('Emerson')
        .should('have.value', 'Emerson')
        .clear()
        .should('have.value','')
        cy.get('#lastName')
        .type('B Tenorio')
        .should('have.value', 'B Tenorio')
        .clear()
        .should('have.value','')
        cy.get('#email')
        .type('emerson@teste.com.br')
        .should('have.value', 'emerson@teste.com.br')
        .clear()
        .should('have.value','')
        cy.get('#phone')
        .type('1197155442')
        .should('have.value', '1197155442')
        .clear()
        .should('have.value','')
       
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('[class="button"]').click();
        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.error').should('be.visible');
        
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        //para selecionar listas
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
        
    });
 
    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked', 'feedback')
         
     });

     it('marca cada tipo de atendimento', () => {
       //essa logica funciona com listas tbm
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) =>{
            cy.wrap($radio)
            .check()
            .should('be.checked')
        })
     });

     it('seleciona todos os produto  por seu índice', () => {
        // cy.get('select').invoke('text').then(($value) => {
        //     cy.wrap($value)
           
            
        //     //.should('have.value',$value )
        // })

    })  
    it.only('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]')
        .check()
        .uncheck(['phone'])
        .should('not.be.checked')

    });





})
