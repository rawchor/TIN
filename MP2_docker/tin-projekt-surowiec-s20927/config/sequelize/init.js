const sequelize = require('./sequelize');

const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');
const Membership = require('../../model/sequelize/Membership');

module.exports = () => {
    Competitor.hasMany(Membership, {as: 'membership', foreignKey: {name: 'competitor_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Membership.belongsTo(Customer, {as: 'competitor', foreignKey: {name: 'competitor_id', allowNull: false} } );
    Club.hasMany(Membership, {as: 'membership', foreignKey: {name: 'club_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Membership.belongsTo(Club, {as: 'club', foreignKey: {name: 'club_id', allowNull: false} });

    let allCompetitors, allClubs;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Competitor.findAll();
        })
        .then(competitors => {
            if( !competitors || competitors.length == 0 ) {
                return Competitor.bulkCreate([
                    {name: 'Borys', surname: 'Surowiec', birthdate: '15-11-2000', dighy: 'Laser', sailNumber: '183368'},
                    {name: 'Przemek', surname: 'Okoński', birthdate: '09-06-2003', dighy: 'Laser', sailNumber: '190758'},
                    {name: 'Jakub', surname: 'Rosłoń', birthdate: '23-03-1995', dighy: 'Laser', sailNumber: '210000'},
                ])
                .then( () => {
                    return Competitor.findAll();
                });
            } else {
                return competitors;
            }
        })
        .then( competitors => {
            allCompetitors = competitors;
            return Club.findAll();
        })
        .then( clubs => {
            if( !clubs || clubs.length == 0 ) {
                return Club.bulkCreate([
                    { name: 'Fir', county: 'Mazowieckie', owner: 'Jerzy Jodłowski', budget: '100000'},
                    { name: 'Sindbad', county: 'Mazowieckie', owner: 'Jakub Rosłoń', budget: '100000'},
                    { name: 'Arka Gdynia', county: 'Mazowieckie', owner: 'Patryk Lutomski', budget: '50000'},
                ])
                .then( () => {
                    return Club.findAll();
                });
            } else {
                return clubs;
            }
        })
        .then( clubs => {
          allClubs = clubs;
            return Membership.findAll();
        })
        .then( memberships => {
            if( !memberships || memberships.length == 0 ) {
                return Membership.bulkCreate([
                    {competitor_id: allCustomers[0]._id, club_id: allClubs[0]._id, competitor: 'Borys Surowiec', club: 'Sindbad', date_from: '07-06-2022', date_to: ''},
                    {competitor_id: allCustomers[0]._id, club_id: allClubs[0]._id, competitor: 'Przemek Okoński', club: 'Spójnia Warszawa', date_from: '07-06-2022', date_to: ''},
                    {competitor_id: allCustomers[0]._id, club_id: allClubs[0]._id, competitor: 'Marcelina Korszon', club: 'AZS AWFiS Gdańsk', date_from: '07-06-2022', date_to: ''},
                ]);
            } else {
                return memberships;
            }
        });
};