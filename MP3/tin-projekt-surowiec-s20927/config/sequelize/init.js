const sequelize = require('./sequelize');
// logowanie
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');
const Membership = require('../../model/sequelize/Membership');

module.exports = () => {
    Competitor.hasMany(Membership, {as: 'memberships', foreignKey: {name: 'competitor_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Membership.belongsTo(Competitor, {as: 'competitor', foreignKey: {name: 'competitor_id', allowNull: false} } );
    Club.hasMany(Membership, {as: 'memberships', foreignKey: {name: 'club_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
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
                    {name: 'Borys', surname: 'Surowiec', birthdate: '2000-11-15', email: 'ultimategingermaster@gmail.com', password: passHash, dighy: 'Laser', sailNumber: '183368'},
                    {name: 'Przemek', surname: 'Okoński', birthdate: '2003-06-09', email: '1@gmail.com', password: passHash, dighy: 'Laser', sailNumber: '190758'},
                    {name: 'Jakub', surname: 'Rosłoń', birthdate: '1995-03-23', email: '2@gmail.com', password: passHash, dighy: 'Laser', sailNumber: '210000'},
                    {name: 'Tomek', surname: 'Kowalski', birthdate: '2000-10-10', email: '3@gmail.com', password: passHash, dighy: 'Laser', sailNumber: '000000'},
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
                    {competitor_id: allCompetitors[0]._id, club_id: allClubs[1]._id, dateFrom: '2022-06-07', dateTo: '2022-06-08'},
                    {competitor_id: allCompetitors[1]._id, club_id: allClubs[1]._id, dateFrom: '2022-06-07', dateTo: '2022-06-08'},
                    {competitor_id: allCompetitors[2]._id, club_id: allClubs[2]._id, dateFrom: '2022-06-07', dateTo: '2022-06-08'}, 
                ]);
            } else {
                return memberships;
            }
        });
}