const Sequelize = require('sequelize');

const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');
const Membership = require('../../model/sequelize/Membership');


exports.getCompetitors = () => {
    return Competitor.findAll();
};

exports.getCompetitorById = (competitorId) => {
    return Competitor.findByPk(competitorId,
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

exports.createCompetitor = (newCompetitorData) => {
    return Competitor.create({
        name: newCompetitorData.name,
        surname: newCompetitorData.surname,
        birthdate: newCompetitorData.birthdate,
        dighy: newCompetitorData.dighy,
        sailNumber: newCompetitorData.sailNumber
    });
};

exports.updateCompetitor = (competitorId, competitorData) => {
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