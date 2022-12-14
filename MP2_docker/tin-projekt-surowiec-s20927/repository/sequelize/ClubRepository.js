const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');
const Membership = require('../../model/sequelize/Membership');


exports.getClub = () => {
    return Club.findAll();
};

exports.getClubById = (clubId) => {
    return Club.findByPk(clubId,
        {
            include: [{
                model: Membership,
                as: 'memberships',
                include: [{
                    model: Club,
                    as: 'clubs'
                }]
            }]
        });
};

exports.createClub = (newClubData) => {
    return Club.create({
        name: newClubData.name,
        county: newClubData.surname,
        owner: newClubData.address,
        budget: newClubData.zip_code
    });
};

exports.updateClub = (competitorId, competitorData) => {
    const name = competitorData.firstName;
    const surname = competitorData.lastName;
    const birthdate = competitorData.address;
    const dighy = competitorData.zip_code;
    const sailNumber = competitorData.email;
    return Competitor.update(competitorData, {where: {_id: competitorId }});
};

exports.deleteCompetitor = (competitorId) => {
    return Competitor.destroy({
        where: { _id: competitorId }
    });
}; 