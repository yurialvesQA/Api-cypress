
import moment from 'moment';


  describe('Testes de comparação entre versões V2 e V3 de APIs', () => {
    const username = 'lorena@teste.dev';
    const password = '745814ef-8c53-4786-9ce8-aab63d6ef0da';
    const urlv2 = 'https://sandbox2.pagueveloz.com.br/api/v2/Saldo/';
    const urlv3 = 'https://sandbox2.pagueveloz.com.br/api/v3/Saldo/';
    const startDate = moment('2023-01-01'); // Data de início
    const endDate = moment('2023-01-05'); // Data de término
    
    for (let date = startDate; date <= endDate; date.add(1, 'day')) {
        const formattedDate = date.format('YYYY-MM-DD');

       it(`Comparar valores entre versões de APIs na Data: ${formattedDate}`, () => {
         // Loop sobre as datas de startDate até endDate
        
            // Solicitação GET para versão 2
            cy.request({
                method: 'GET',
                url: urlv2+formattedDate,
                auth: {
                    username: username,
                    password: password
                }
            }).then((responseV2) => {
                expect(responseV2.status).to.eq(200); // Verifica se a requisição foi bem-sucedida

                // Solicitação GET para versão 3
                cy.request({
                    method: 'GET',
                    url: urlv3+formattedDate,
                    auth: {
                        username: username,
                        password: password
                    }
                }).then((responseV3) => {
                    expect(responseV3.status).to.eq(200); // Verifica se a requisição foi bem-sucedida

                    // Comparar os valores dos campos JSON

                    expect(responseV2.body.Data, `Valor do campo Data na data ${formattedDate} na V2`).to.eq(responseV3.body.Data);
                    expect(responseV2.body.Disponivel, `Valor do campo Disponivel na data ${formattedDate} na V2`).to.eq(responseV3.body.Disponivel);
                    expect(responseV2.body.Futuro, `Valor do campo Futuro na data ${formattedDate} na V2`).to.eq(responseV3.body.Futuro);
                    expect(responseV2.body.Bloqueado, `Valor do campo Bloqueado na data ${formattedDate} na V2`).to.eq(responseV3.body.Bloqueado);
                    expect(responseV2.body.BloqueadoAteAtivacao, `Valor do campo BloqueadoAteAtivacao na data ${formattedDate} na V2`).to.eq(responseV3.body.BloqueadoAteAtivacao);
                    expect(responseV2.body.LiberadoParaUso, `Valor do campo LiberadoParaUso na data ${formattedDate} na V2`).to.eq(responseV3.body.LiberadoParaUso);


                
                });
            });
        
        });
    }
});
