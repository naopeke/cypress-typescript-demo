import * as lists from '../fixtures/lists.json';
it('test', ()=>{
    cy.visit('/');
    cy.contains('Get started!').should('be.visible');
    cy.get('.mb-8').invoke('text');
    cy.get('[data-cy="board-item"]').realHover();

    cy.get('[data-cy="first-board"]').type('new board{enter}');
})