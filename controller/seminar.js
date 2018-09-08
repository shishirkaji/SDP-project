var seminarController = {};
const Seminar = require('../model/seminar');
var SeminarBuilder = require('../Data/seminar/seminar');
seminarController.addSeminar = (req, res, next) => {
    let newSeminar = new SeminarBuilder("joel")
    .buildAbstract("fef")
    .buildVenue('feaw')
    .setDate(Date.now())
    .setTime(Date.now())
    .buildVenue("vueaew")
    .setCapacity(313)
    .setDuration(12212)
    .build();

    Seminar.create(newSeminar);
}

module.exports = seminarController;