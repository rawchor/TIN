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
                as: 'membership',
                include: [{
                    model: Club,
                    as: 'club'
                }]
            }]
        });
};

exports.createClub = (newClubData) => {
    return Club.create({
        name: newClubData.name,
        surname: newCustomerData.surname,
        address: newCustomerData.address,
        zip_code: newCustomerData.zip_code,
        email: newCustomerData.email,
        phone_number: newCustomerData.phone_number
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const name = customerData.firstName;
    const surname = customerData.lastName;
    const address = customerData.address;
    const zip_code = customerData.zip_code;
    const email = customerData.email;
    const phone_number = customerData.phone_number;
    return Customer.update(customerData, {where: {_id: customerId }});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

}; 