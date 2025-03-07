export {}
import Board from "../typings/board"
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Add a new board via API
             * @param name --name of the board
             * @example
             * cy.addBoard('new board')
             */
            addBoard(name: string): Chainable<Board>
        }
    }
}

Cypress.Commands.add('addBoard', (name: string)=>{
    Cypress.log({
        displayName: 'add board',
        message: name,
        consoleProps(){
            return {
                name
            }
        }
    })
    return cy.request('POST', '/api/boards', { name }).its('body')
})