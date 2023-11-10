// TODO: combine with Box Element in Sidebar test
describe('Image element', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#side-panel button').eq(2).click(); // second button is the text-element
  })

  describe('Sidebar', () => {
    it('should add image element', () => {
      cy.get('.b-img').trigger('mouseover');
      cy.get('.b-img').contains('2');
      cy.get('.b-img .b-action-remove');
      cy.get('.b-img .b-action-duplicate');
    })
    it('should see the config data of image element', () => {
      cy.get('.b-img').trigger('click');
      cy.get('#side-panel').contains('width');
      cy.get('#side-panel').contains('Selected element #2');
      cy.get('#side-panel').contains('Change the src');
      cy.get('.b-src-element');
    })
    it('should update the styles of added element', () => {
      cy.get('.b-img').should('have.css', 'width', '300px');
      cy.get('.b-img').trigger('click');
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('200px');
      cy.get('.b-img').should('have.css', 'width', '200px');
    })
    it('should update the src of added element', () => {
      cy.get('.b-img').trigger('click');
      cy.get('.b-src-element').clear();
      cy.get('.b-src-element').type('img.png');
      cy.get('.b-img img[src="img.png"]')
    })
    it('should add multiple elements', () => {
      cy.get('#side-panel button').eq(2).click();
      cy.get('#side-panel button').eq(2).click();
      cy.get('#side-panel button').eq(2).click();
      cy.get('#side-panel button').eq(2).click();
      cy.get('.b-wrapper > .b-img').should('have.length', 5)
    })
  });

  describe('Delete', () => {
    
    it('should delete ', () => {
      cy.get('.b-img').trigger('mouseover');
      cy.get('.b-actions-toolbar .b-action-remove').click();
      cy.get('.b-img').should('not.exist');
    })
    it('should delete elements and do not touch other elements', () => {
      
      cy.get('#side-panel button').eq(2).click();
      cy.get('#side-panel button').eq(2).click();
      cy.get('#side-panel button').eq(2).click();

      // Deleteing
      cy.get('.b-img').eq(1).trigger('mouseover'); 
      cy.get('.b-img .b-action-remove').eq(1).click();
      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img .b-action-remove').eq(1).click();

      // Checking
      cy.get('.b-img').eq(0).trigger('mouseover');
      cy.get('.b-img').eq(0).contains('2');
      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img').eq(1).contains('5');
    })
  });

  describe('Duplicate', () => {

    beforeEach(() => {
      cy.get('.b-img').trigger('click');
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('200px');

      cy.get('.b-src-element').clear();
      cy.get('.b-src-element').type('img.png');

      cy.get('.b-img').trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').click();
    });
   
    it('should duplicate element with styles', () => {

      cy.get('.b-img img[src="img.png"]').eq(0)
      cy.get('.b-img img[src="img.png"]').eq(1)
      
      cy.get('.b-img').eq(0).should('have.css', 'width', '200px');

    })
    it('should duplicate multiple element with updated styles', () => {

      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').eq(1).click();
      cy.get('.b-img').eq(2).trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').eq(2).click();
      
      cy.get('.b-img').eq(0).should('have.css', 'width', '200px');
      cy.get('.b-img').eq(1).should('have.css', 'width', '200px');
      cy.get('.b-img').eq(2).should('have.css', 'width', '200px');
      cy.get('.b-img').eq(3).should('have.css', 'width', '200px');

      cy.get('.b-img img[src="img.png"]').eq(0);
      cy.get('.b-img img[src="img.png"]').eq(1);
      cy.get('.b-img img[src="img.png"]').eq(2);
      cy.get('.b-img img[src="img.png"]').eq(3);
    })
    it('should change the style and config of duplicated element', () => {

      cy.get('.b-img').eq(1).click();
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('100px');
      
      cy.get('.b-src-element').clear();
      cy.get('.b-src-element').type('no-image.jpg');

      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').eq(1).click();

      cy.get('.b-img').eq(0).should('have.css', 'width', '200px');
      cy.get('.b-img').eq(1).should('have.css', 'width', '100px');
      cy.get('.b-img').eq(2).should('have.css', 'width', '100px');

      cy.get('.b-img img').eq(0).should('have.attr', 'src', 'img.png')
      cy.get('.b-img img').eq(1).should('have.attr', 'src', 'no-image.jpg')
      cy.get('.b-img img').eq(2).should('have.attr', 'src', 'no-image.jpg')

    })
    it('should add element with default style and config after updating', () => {
      
      cy.get('.b-wrapper').click();
      cy.get('#side-panel button').eq(2).click(); 

      cy.get('.b-img img').eq(0).should('have.attr', 'src', 'img.png')
      cy.get('.b-img').eq(0).should('have.css', 'width', '200px');

      cy.get('.b-img img').eq(1).should('have.attr', 'src', 'img.png')
      cy.get('.b-img').eq(1).should('have.css', 'width', '200px');

      cy.get('.b-img img').eq(2).should('have.attr', 'src', 'https://ionicframework.com/docs/img/demos/thumbnail.svg')
      cy.get('.b-img').eq(2).should('have.css', 'width', '300px');
    })
    it('should be able to delete the root element after duplication', () => {

      cy.get('.b-img').eq(0).trigger('mouseover');
      cy.get('.b-img .b-action-remove').eq(0).click();

      cy.get('.b-img').should('have.css', 'width', '200px');
      cy.get('.b-img img').should('have.attr', 'src', 'img.png')
    })
    it('should correctly position the new duplicated element', () => {

      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').eq(1).click();
    
      cy.get('.b-img').eq(1).click()
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('100px');

      cy.get('.b-src-element').clear();
      cy.get('.b-src-element').type('no-image.jpg');

      cy.get('.b-img').eq(1).trigger('mouseover');
      cy.get('.b-img .b-action-duplicate').eq(1).click();

      cy.get('.b-img img').eq(0).should('have.attr', 'src', 'img.png')
      cy.get('.b-img').eq(0).should('have.css', 'width', '200px');

      cy.get('.b-img img').eq(1).should('have.attr', 'src', 'no-image.jpg')
      cy.get('.b-img').eq(1).should('have.css', 'width', '100px');

      cy.get('.b-img img').eq(2).should('have.attr', 'src', 'no-image.jpg')
      cy.get('.b-img').eq(2).should('have.css', 'width', '100px');
      
      cy.get('.b-img img').eq(3).should('have.attr', 'src', 'img.png')
      cy.get('.b-img').eq(3).should('have.css', 'width', '200px');
    })
  });
})
