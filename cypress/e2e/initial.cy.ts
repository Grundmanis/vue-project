describe('Initial state', () => {
  it('should see the initial elements in working area', () => {
    cy.visit('/')
    cy.get('#workarea');
    cy.get('#workarea .b-wrapper.active');
    cy.get('#side-panel').contains('Show grid');
    cy.get('#side-panel').contains('Selected element #1');
    cy.get('#side-panel').contains('Insert element');

    // TODO: think abt update styles

  })
  it('should see the toolbar on the initial state mouseover', () => {
    cy.visit('/')
    cy.get('.b-wrapper').trigger('mouseover');
    cy.get('.b-wrapper').contains('1');
  })
  it('should see the styles to update by clicking on wrapper', () => {
    cy.visit('/')
    cy.get('.b-wrapper').trigger('click');
    cy.get('#side-panel').contains('height');
    cy.get('#side-panel').contains('width');
    cy.get('#side-panel').contains('minHeight');
    cy.get('#side-panel').contains('backgroundColor');
    cy.get('#side-panel .b-style-backgroundColor');
    cy.get('#side-panel .b-style-minHeight');
    cy.get('#side-panel .b-style-width');
    cy.get('#side-panel .b-style-height');
  })
  it('should update the styles of wrapper element', () => {
    cy.visit('/')
    cy.get('.b-wrapper').trigger('click');
    cy.get('.b-style-backgroundColor').clear();
    cy.get('.b-style-backgroundColor').type('red');
    cy.get('.b-wrapper').should('have.css', 'background-color', 'rgb(255, 0, 0)') // red
  })
})
