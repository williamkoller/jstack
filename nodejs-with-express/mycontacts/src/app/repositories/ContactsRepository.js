const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'William',
    email: 'william@mail.com',
    phone: '41999999999',
    categoryId: v4(),
  },
  {
    id: v4(),
    name: 'Matheus',
    email: 'mateus@mail.com',
    phone: '41999999999',
    categoryId: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, categoryId,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        categoryId,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, categoryId,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        categoryId,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
