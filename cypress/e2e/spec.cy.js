describe('Create and connect to an account', () => {
  it('Visits the Oc commerce site', () => {
    cy.visit('/home')

    // Créer un compte
    cy.contains('SIGNUP').click()
    cy.url().should('include', '/user/signup')
    cy.get('[id^=fname]').type('fakeuserss')
    cy.get('[id^=lname]').type('toto')
    cy.get('[id^=username]').type('junior')
    cy.get('[id^=email]').type('fake@email.com')
    cy.get('[id^=pass]').type('1hstesh<23456789')
    cy.get('[id^=re_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Register').click()

    // Redirection vers login
    cy.url().should('include', '/user/login')

    // Se connecter avec le compte créé
    cy.get('[id^=your_name]').type('fakeuser')
    cy.get('[id^=your_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Log in').click()

    // Vérification sur page d'accueil
    cy.url().should('include', '/home')
    cy.contains('PRODUCTS')
  })
})

describe('Put item in favourite', () => {
  it('Connect to OC commerce and put in favourite', () => {
    cy.visit('/home')

    // Connexion
    cy.contains('LOGIN').click()
    cy.url().should('include', '/user/login')
    cy.get('[id^=your_name]').type('fakeuser')
    cy.get('[id^=your_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')

    // Aller dans FAVOURITE
    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')

    // Vérifier qu'il n'y a pas de favoris
    cy.get('body').then(($body) => {
      if ($body.text().includes('No Product in your favourite list')) {
        cy.contains('No Product in your favourite list')
      } else {
        // Supprimer les favoris existants
        cy.get('.fa-heart').each(($btn) => {
          cy.wrap($btn).click()
        })
        cy.contains('No Product in your favourite list')
      }
    })

    // Retourner sur HOME (logo)
    cy.get('a.navbar-brand').click()
    cy.url().should('include', '/home')

    // Ajouter un produit aux favoris
    cy.get('.fa-heart').first().click()

    // Aller dans FAVOURITE
    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')

    // Vérifier qu'un produit est présent
    cy.get('table tbody tr').should('have.length.at.least', 1)

    // Retirer le produit
    cy.get('.fa-heart').first().click()

    // Vérifier que la liste est vide
    cy.contains('No Product in your favourite list')
  })
})

describe('Put item in cart', () => {
  it('Connect to OC commerce and put in cart', () => {
    cy.visit('/home')

    // Connexion
    cy.contains('LOGIN').click()
    cy.url().should('include', '/user/login')
    cy.get('[id^=your_name]').type('fakeuser')
    cy.get('[id^=your_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')

    // Gérer l'alerte avant d'ajouter au panier
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Produit ajouté au panier')
    })

    // Ajouter un produit au panier
    cy.contains('Ajouter au panier').first().click()

    // Aller sur le PANIER
    cy.contains('Panier').click()
    cy.url().should('include', '/favourite/panier')

    // Vérifier qu'un produit est présent
    cy.get('table tbody tr').should('have.length.at.least', 1)
  })
})
