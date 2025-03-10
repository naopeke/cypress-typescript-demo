import * as lists from '../fixtures/lists.json';

it('test', ()=>{
    cy.visit('/');
    cy.contains('Get started!').should('be.visible');
    cy.get('.mb-8').invoke('text');
    cy.get('[data-cy="first-board"]').should('be.visible').type('new board{enter}');
    // cy.get('[data-cy="board-item"]').realHover();
})

it('testing with typescript', ()=>{
    //POSTリクエストが/api/listsに送信されるのを監視。.as('listCreate')で、このリクエストをlistCreateという名前でエイリアス（別名）をつける。
    cy.intercept('POST', '/api/lists').as('listCreate');

    cy.visit('/board/1');

    lists.forEach( list =>{

        cy.get('[data-cy="add-list-input"]').type(`${list.name}{enter}`);
    
        //先ほどエイリアスをつけたlistCreateというAPIリクエストが完了するのを待機
        cy.wait('@listCreate')
            .its('response.body.order') //そのリクエストのレスポンス（response.body）からorderフィールドを取得。.its() は、Cypressのコマンドの一つで、取得したオブジェクトのプロパティにアクセスするために使用
            .should('eq', list.order); //取得したorderが、lists配列に定義された順番（list.order）と一致することを確認
    })
})

it('create a new board', ()=>{
    cy.visit('/');
    // cy.get('[placeholder="Name of your first board"]')
    cy.getByPlaceholder('Name of your first board');
})

it('create a new board', ()=>{
    cy.addBoard('new board')
        .then((body)=>{
            expect(body.id).to.exist;
            expect(body.starred).to.be.false;
            expect(body.name).to.eq('new');
        })
})

it.only('delete a board', ()=>{
    cy.addBoard('new board');
    cy.editBoard({
        id: 1,
        name: 'myboard',
    });

})