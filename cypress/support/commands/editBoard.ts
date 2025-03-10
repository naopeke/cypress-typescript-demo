export {}
import Board from "../typings/board";
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Changes board via API
             * @param body - changes you want to make to the board
             * @example
             * cy.editBoard(1)
             */
            // editBoard(body: Record<string, any>): Chainable<Board> //utility types, Record enebles us to define what kind of keys we want to type and whaat kind of parameters should those keys have
            // editBoard(body: Pick<Board, 'id' | 'name'>): Chainable<Board> //utility types, this enables us to pick any attributes that we want from an existing interface パイプにすることで、２つ(id, name)を入れられる
            // editBoard(body: Omit<Board, 'created' | 'user'>): Chainable<Board>
            // editBoard(body: {
            //     id?: Board['id'],
            //     name?: Board['name'],
            //     starred?: Board['starred']
            // }): Chainable<Board>
            // editBoard(body: Partial<Board> & Required<Pick<Board, 'id'>>): Chainable<Board>
            editBoard: typeof editBoard;
        }
    }
}

// Cypress.Commands.add('editBoard', (body)=>{
//     Cypress.log({
//         displayName: 'edit board',
//         consoleProps(){
//             return {
//                 id: body.id
//             }
//         }
//     })
//     return cy.request('PATCH', `/api/boards${body.id}`, body).its('body')
// })

const editBoard = (body: Partial<Board> & Required<Pick<Board, 'id'>>)=>{
    Cypress.log({
        displayName: 'edit board',
        consoleProps(){
            return {
                id: body.id
            }
        }
    })
    return cy.request('PATCH', `/api/boards${body.id}`, body).its('body')
}
Cypress.Commands.add('editBoard', editBoard);