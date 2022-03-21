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
      return response
        .status(statusCode.NOT_FOUND)
        .json({ error: 'Contact not found.' });
    }

    response.status(statusCode.OK).json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, categoryId,
    } = request.body;

    if (!name) {
      return response
        .status(statusCode.BAD_REQUEST)
        .json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(statusCode.CONFLICT)
        .json({ error: 'This e-mail is already use.' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      categoryId,
    });

    response.status(statusCode.OK).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, categoryId,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response
        .status(statusCode.NOT_FOUND)
        .json({ error: 'Contact not found.' });
    }

    if (!name) {
      return response
        .status(statusCode.BAD_REQUEST)
        .json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(statusCode.CONFLICT)
        .json({ error: 'This e-mail is already use.' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      categoryId,
    });

    response.status(statusCode.OK).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response
        .status(statusCode.NOT_FOUND)
        .json({ error: 'Contact not found.' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(statusCode.NOT_CONTENT);
  }
}

// Singleton
module.exports = new ContactController();
