const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'William',
    email: 'william@mail.com',
    phone: '41999999999',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
