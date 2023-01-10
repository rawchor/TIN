const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');
const Membership = require('../../model/sequelize/Membership');

exports.getClubs = () => {
    return Club.findAll();
};

exports.getClubById = (clubId) => {
    return Club.findByPk(clubId,
        {
            include: [{
                model: Membership,
                as: 'memberships',
                include: [{
                    model: Competitor,
                    as: 'competitor'
                }]
            }]
        });
};

exports.createClub = (newClubData) => {
    return Club.create({
        name: newClubData.name,
        county: newClubData.county,
        owner: newClubData.owner,
        budget: newClubData.budget
    });
};

exports.updateClub = (clubId, clubData) => {
    const name = clubData.name;
    const county = clubData.county;
    const owner = clubData.owner;
    const budget = clubData.budget;
    return Club.update(clubData, {where: {_id: clubId }});
};

exports.deleteClub = (clubId) => {
    return Club.destroy({
        where: { _id: clubId }
    });
}; 