describe('Text Element', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#side-panel button').eq(1).click(); // second button is the text-element
  })

  describe('Sidebar', () => {
    it('should add text element', () => {
      cy.get('.b-text').trigger('mouseover');
      cy.get('.b-text').contains('2');
      cy.get('.b-text .b-action-remove');
      cy.get('.b-text .b-action-duplicate');
    })
    it('should see the config data of text element', () => {
      cy.get('.b-text').trigger('click');
      cy.get('#side-panel').contains('color');
      cy.get('#side-panel').contains('Selected element #2');
      cy.get('#side-panel').contains('Change the text');
      cy.get('#side-panel').contains('Change the type');
      cy.get('.b-text-element');
    })
    it('should update the styles of added element', () => {
      cy.get('.b-text').should('have.css', 'color', 'rgb(0, 0, 0)');
      cy.get('.b-text').trigger('click');
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('#555');
      cy.get('.b-text').should('have.css', 'color', 'rgb(85, 85, 85)');
    })
    it('should update the text of added element', () => {
      cy.get('.b-text').contains('lorem ipsum')
      cy.get('.b-text').trigger('click');
      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Hello');
      cy.get('.b-text').contains('Hello')
    })
    it('should add multiple elements', () => {
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click();
      cy.get('.b-wrapper > .b-text').should('have.length', 5)
    })
    it('should update the tag', () => {
      cy.get('.b-text').trigger('click');
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('h1');
      cy.get('h1.b-text')
    })
  });

  describe('Delete', () => {
    
    it('should delete ', () => {
      cy.get('.b-text').trigger('mouseover');
      cy.get('.b-actions-toolbar .b-action-remove').click();
      cy.get('.b-text').should('not.exist');
    })
    it('should delete elements and do not touch other elements', () => {
      
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click();

      // Deleteing
      cy.get('.b-text').eq(1).trigger('mouseover'); 
      cy.get('.b-text .b-action-remove').eq(1).click();
      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text .b-action-remove').eq(1).click();

      // Checking
      cy.get('.b-text').eq(0).trigger('mouseover');
      cy.get('.b-text').eq(0).contains('2');
      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text').eq(1).contains('5');
    })
  });

  describe('Duplicate', () => {

    beforeEach(() => {
      cy.get('.b-text').trigger('click');
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');

      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Hello');
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('h1');

      cy.get('.b-text').trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').click();
    });
   
    it('should duplicate element with styles', () => {

      cy.get('.b-text').eq(0).contains('Hello');
      cy.get('.b-text').eq(1).contains('Hello');
      
      cy.get('.b-text').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-text').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('h1.b-text');

    })
    it('should duplicate multiple element with updated styles', () => {

      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').eq(1).click();
      cy.get('.b-text').eq(2).trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').eq(2).click();

      cy.get('.b-text').eq(0).contains('Hello');
      cy.get('.b-text').eq(1).contains('Hello');
      cy.get('.b-text').eq(2).contains('Hello');
      cy.get('.b-text').eq(3).contains('Hello');
      
      cy.get('.b-text').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-text').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-text').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-text').eq(3).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('h1.b-text').eq(0);
      cy.get('h1.b-text').eq(1);
      cy.get('h1.b-text').eq(2);
      cy.get('h1.b-text').eq(3);
    })
    it('should change the style and config of duplicated element', () => {

      cy.get('.b-text').eq(1).click();
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');
      
      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Bye');
      
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('h3');

      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').eq(1).click();

      cy.get('.b-text').eq(0).contains('Hello');
      cy.get('.b-text').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h1.b-text').eq(0);
      
      cy.get('.b-text').eq(1).contains('Bye');
      cy.get('.b-text').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h1.b-text').eq(0);

      cy.get('.b-text').eq(2).contains('Bye');
      cy.get('.b-text').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h3.b-text').eq(1)
    })
    it('should add element with default style and config after updating', () => {
      
      cy.get('.b-wrapper').click();
      cy.get('#side-panel button').eq(1).click(); // first button is the text-element

      cy.get('.b-text').eq(0).contains('Hello');
      cy.get('.b-text').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-text').eq(1).contains('Hello');
      cy.get('.b-text').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-text').eq(2).contains('lorem ipsum');
      cy.get('.b-text').eq(2).should('have.css', 'color', 'rgb(0, 0, 0)');
      cy.get('p.b-text');
    })
    it('should be able to delete the root element after duplication', () => {

      cy.get('.b-text').eq(0).trigger('mouseover');
      cy.get('.b-text .b-action-remove').eq(0).click();

      cy.get('.b-text').should('have.length', 1)
      cy.get('.b-text').should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h1.b-text');
    })
    it('should correctly position the new duplicated element', () => {

      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').eq(1).click();
    
      cy.get('.b-text').eq(1).click()
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');

      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Bye');

      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('h4');

      cy.get('.b-text').eq(1).trigger('mouseover');
      cy.get('.b-text .b-action-duplicate').eq(1).click();

      cy.get('.b-text').eq(0).contains('Hello');
      cy.get('.b-text').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-text').eq(1).contains('Bye');
      cy.get('.b-text').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h4.b-text').eq(0);

      cy.get('.b-text').eq(2).contains('Bye');
      cy.get('.b-text').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('h4.b-text').eq(1);
      
      cy.get('.b-text').eq(3).contains('Hello');
      cy.get('.b-text').eq(3).should('have.css', 'color', 'rgb(85, 85, 85)');
    })
  });
})
