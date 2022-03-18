const statusCode = require('../../enum/status-code/statusCode');

class ContactController {
  index(request, response) {
    response.status(statusCode.OK).send('Send from Contact Controller');
  }

  show() {

  }

  store() {

  }

  update() {

  }

  delete() {

  }
}

// Singleton
module.exports = new ContactController();
