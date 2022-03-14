/**
 * Modulos: sao conjutos de codigo
 *
 * 3 tipos de modules:
 * TODOS OS ARQUIVOS JAVASCRIPT SAO MODULOS;
 * Nativos (http);
 * npm (Node Package Manager);
 */

const { printName, lastName } = require('./printName');

printName(`William ${lastName}`);
