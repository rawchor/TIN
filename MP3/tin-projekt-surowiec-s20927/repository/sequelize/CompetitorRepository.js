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
                    as: 'club'
                }]
            }]
        });
};

exports.createCompetitor = (newCompetitorData) => {
    return Competitor.create({
        name: newCompetitorData.name,
        surname: newCompetitorData.surname,
        birthdate: newCompetitorData.birthdate,
        email: newCompetitorData.email,
        password: newCompetitorData.password,
        dighy: newCompetitorData.dighy,
        sailNumber: newCompetitorData.sailNumber
    });
};

exports.updateCompetitor = (competitorId, competitorData) => {
    const name = competitorData.firstName;
    const surname = competitorData.lastName;
    const email = competitorData.email;
    const password = competitorData.password;
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

// Logowanie
exports.findByEmail = (email) => {
    return Competitor.findOne({
        where: {email: email}
    });
}