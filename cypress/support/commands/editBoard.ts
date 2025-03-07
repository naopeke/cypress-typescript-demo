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
            editBoard(body: Pick<Board, 'id' | 'name'>): Chainable<Board> //utility types, this enables us to pick any attributes that we want from an existing interface パイプにすることで、２つ(id, name)を入れられる
        }
    }
}
