import models from '@database/models';
import BaseService from './BaseService';

const { Sequelize: { Op } } = models;

class PhonebookService extends BaseService {
}

const { Phonebook } = models;
export default new PhonebookService(Phonebook);