describe('Home Page', () => {
  it('should show carousel items by default', () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('div.ui-recommendations-carousel-snapped').should('exist');
    cy.get('div.ui-recommendations-carousel-snapped')
      .find('div.andes-carousel-snapped__slide')
      .should('exist');
  });

  it('should show categories', () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('a.nav-menu-categories-link').click();
    cy.get('div.categories').should('exist');
  });

  it("category 'Agro' should exist", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('a.nav-menu-categories-link').click();
    cy.get('div.categories').should('exist');
    cy.get('div.categories').contains('Agro').should('exist');
  });

  it("category 'FGHJK' should not exist", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('a.nav-menu-categories-link').click();
    cy.get('div.categories').should('exist');
    cy.get('div.categories').contains('FGHJK').should('not.exist');
  });
});

describe('Search', () => {
  it('should show search results', () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
  });

  it("should show search results for 'iphone'", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    cy.get('h2.ui-search-item__title')
      .first()
      .contains(/iphone|Iphone|iPhone/);
  });

  it("should show search results for 'FGHJK'", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('FGHJK');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    cy.get('h2.ui-search-item__title').first().should('not.contain', 'FGHJK');
  });
});

describe('Product Detail', () => {
  it('should show product detail', () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    cy.get('h2.ui-search-item__title').first().click();

    cy.get('div.ui-pdp-container').should('exist');
  });

  it('product detail title should be the same as the one clicked', () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    // save the title of the first product, in a variable
    cy.get('h2.ui-search-item__title')
      .first()
      .then(($title) => {
        const title = $title.text();
        cy.get('h2.ui-search-item__title').first().click();
        // verify that the title of the product detail is the same as the one saved
        cy.get('div.ui-pdp-container').should('exist');
        cy.get('h1.ui-pdp-title').should('contain', title);
      });
  });

  it("product detail should show 'Comprar ahora' button", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    cy.get('h2.ui-search-item__title')
      .first()
      .then(($title) => {
        cy.get('h2.ui-search-item__title').first().click();
        cy.get('button.ui-pdp-action--primary').should('exist');
      });
  });

  it("after clicking 'Comprar ahora' button, should show login page", () => {
    cy.visit('https://www.mercadolibre.com.co/');

    cy.get('input.nav-search-input').type('iphone');
    cy.get('button.nav-search-btn').click();

    cy.get('div.ui-search-result__wrapper').should('exist');
    cy.get('h2.ui-search-item__title')
      .first()
      .then(($title) => {
        cy.get('h2.ui-search-item__title').first().click();
        cy.get('button.ui-pdp-action--primary').click();

        cy.origin('https://www.mercadolibre.com/', () => {
          cy.get('h1.center-card__title').should('contain', '¡Hola! Para comprar, ingresa a tu cuenta');
        });
      });
  });

});
