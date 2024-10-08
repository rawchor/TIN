const Sequelize = require('sequelize');

const Membership = require('../../model/sequelize/Membership');
const Competitor = require('../../model/sequelize/Competitor');
const Club = require('../../model/sequelize/Club');

exports.getMemberships = () => {
    return Membership.findAll({ include: [
        {
            model: Competitor,
            as: 'competitor'
        },
        {
            model: Club,
            as: 'club'
        }]
    });
};

exports.getMembershipById = (membershipId) => {
    return Membership.findByPk(membershipId, { include: [
        {
            model: Competitor,
            as: 'competitor'
        },
        {
            model: Club,
            as: 'club'
        }]
    });  
};

exports.createMembership = (data) => {
    console.log(JSON.stringify(data));

    return Membership.create({
        competitor_id: data.competitor_id,
        club_id: data.club_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateMembership = (membershipId, data) => {
    return Membership.update(data, {where: {_id: membershipId }});
}

exports.deleteMembership = (membershipId) => {
    return Membership.destroy({
        where: { _id: membershipId }
    });
}

exports.deleteManyMemberships = (membershipId) => {
    return Membership.find({ _id: { [Sequelize.Op.in]: membershipId }})
}