describe('Sidebar', () => {

  it('should toggle the grid', () => {
    cy.visit('/')
    cy.get('#side-panel button').eq(0).click(); // first button is the box-element
    cy.get('#workarea .b-box').should('have.css', 'border', '1px dotted rgb(143, 143, 143)');
    cy.get('#showGrid').click()
    cy.get('#workarea .b-box').should('not.have.css', 'border', '1px dotted rgb(143, 143, 143)');
  })
})
