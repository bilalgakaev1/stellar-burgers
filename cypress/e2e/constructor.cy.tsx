const BASE_URL = 'http://localhost:4000';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'Bearer test-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-testid="ingredient-item"]').first().find('button').click();
    cy.get('[data-testid="constructor-bun-top"]').should('exist');
  });

  it('добавляет начинку в конструктор', () => {
    cy.get('[data-testid="ingredient-item"]').eq(1).find('button').click();
    cy.get('[data-testid="constructor-ingredients"]')
      .children()
      .should('have.length.greaterThan', 0);
  });

  it('открывает модальное окно ингредиента', () => {
    cy.get('[data-testid="ingredient-item"]').first().find('a').click();
    cy.get('[data-testid="modal"]').should('exist');
  });

  it('закрывает модальное окно по крестику', () => {
    cy.get('[data-testid="ingredient-item"]').first().find('a').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модальное окно по оверлею', () => {
    cy.get('[data-testid="ingredient-item"]').first().find('a').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');
    });

    it('оформляет заказ', () => {
      // Добавляем булку
      cy.get('[data-testid="ingredient-item"]').first().find('button').click();
      // Добавляем начинку
      cy.get('[data-testid="ingredient-item"]').eq(1).find('button').click();
      // Оформляем заказ
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');
      // Проверяем модалку с номером заказа
      cy.get('[data-testid="modal"]').should('exist');
      cy.get('[data-testid="order-number"]').should('contain', '12345');
      // Закрываем модалку
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
      // Конструктор пустой
      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    });
  });
});