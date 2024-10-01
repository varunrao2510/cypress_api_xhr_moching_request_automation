/// <reference types = "cypress" />

describe('Network request',() => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')
    })

    it('Get request', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://jsonplaceholder.cypress.io/comments/1',
        },
            {
                body: {
                    "postId": 1,
                    "id": 1,
                    "name": "id labore ex et quam laborum",
                    "email": "Eliseo@gardner.biz",
                    "body": "Lets goooo"
            }
        }).as('getComment')

        cy.get('.network-btn').click()
        cy.wait('@getComment').its('response.statusCode').should('eq',200)

    })

    it('Post request', () => {
        cy.intercept('POST', 'https://jsonplaceholder.cypress.io/comments').as('postComments')
        cy.get('.network-post').click()
        cy.wait('@postComments').should(({request,response}) => {
            console.log(request)
            expect(request.body).to.include('email')
            console.log(response)
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()")
        })
    })

    it('PUT request', () => {
        cy.intercept({
            method: 'PUT',
            url: 'https://jsonplaceholder.cypress.io/comments/1'
        },
            {
                statusCode: 404,
                body: {
                    error: "Hurray",
                    delay: 500
                }
            }).as("putComment")
        
        cy.get('.network-put').click()
    })
})