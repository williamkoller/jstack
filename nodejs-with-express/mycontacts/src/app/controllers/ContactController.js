const statusCode = require('../../enum/status-code/statusCode');
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.status(statusCode.OK).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      response.status(statusCode.NOT_FOUND).json({ error: 'Contact not found.' });
    }

    response.status(statusCode.OK).json(contact);
  }

  store() {

  }

  update() {

  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      response
        .status(statusCode.NOT_FOUND)
        .json({ error: 'Contact not found.' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(statusCode.NOT_CONTENT);
  }
}

// Singleton
module.exports = new ContactController();
