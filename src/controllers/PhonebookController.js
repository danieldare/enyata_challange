
import Response from "../helpers/response";
import PhonebookService from "../services/PhonebookService";

class PhonebookController{
    /**
   * Fetch a list of contacts from the phonebook
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof PhonebookController
   */
  static async getAllContacts(req, res) {
    try{
      const { user } = req; 
      const contacts = await PhonebookService.getAll({ userId: user.id});
      if(!contacts){
        return Response.errorResponse(res, "No Contact Added yet", 404);
      }
      Response.successResponse(res, { contacts }, "Contacts retrieved successfully");
    }catch(err){
      Response.errorResponse(res, "Something went wrong!");
    }
  }

  /**
   * Fetch a single article by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof PhonebookController
   */
  static async getContact(req, res) {
    try{
      const { params: { id: contactId } } = req;
      const contact = await PhonebookService.getById(contactId);
      if(!contact){
        return Response.errorResponse(res, "No Contact is Added yet", 404);
      }
      Response.successResponse(res, { contact });
    }catch(err){
      Response.errorResponse(res, "Something went wrong")
    }
  }

  /**
   * Create a new contact
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof PhonebookController
   */
  static async createContact(req, res) {
      try{
        const { body, user} = req;
        body.userId = user.id;
        const contact = await PhonebookService.create(body);
        Response.successResponse(res, contact,  "Contact created successfully",  201);
      }catch(err){
        Response.errorResponse(res, err)
      }
  }

  /**
   * Update a contact resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof PhonebookController
   */
  static async updateContact(req, res) {
      const {
        body,
        params: { id: contactId },
      } = req;
      const contact = await PhonebookService.update(contactId, body);
      Response.successResponse(res, { contact }, "Updated Successfully", 200);
  }

  /**
   * Remove a specific contact
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof PhonebookController
   */
  static async destroyContact(req, res) {
      const { locals: { contact } } = res;
      await contact.destroy();
      Response.successResponse(res, null, "Delected Successfully", 204);
  }
}


export default PhonebookController;