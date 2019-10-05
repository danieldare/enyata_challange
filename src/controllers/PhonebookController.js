
import Response from "../helpers/response";
import PhonebookService from "../services/PhonebookService";
import redis from "redis";

const client = redis.createClient();

client.on("connect", () => {
  console.log("Connected to redis")
})

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
    // key to store results in Redis store
    const contactsRedisKey = `user:contacts-${req.user.id}`;

    try{
      const { user } = req; 
      client.get(contactsRedisKey, async (err, obj) => {
        if(obj){
          Response.successResponse(res,  JSON.parse(obj) , "Contacts retrieved successfully");
        }else{

            const contacts = await PhonebookService.getAll({ userId: user.id});
            if(!contacts){
              return Response.errorResponse(res, "No Contact Added yet", 404);
            }
            // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
            client.setex(contactsRedisKey, 3600, JSON.stringify(contacts))
            Response.successResponse(res, { contacts }, "Contacts retrieved successfully");

        }
      })
    }catch(err){
      console.log(err)
      Response.errorResponse(res, "Something went wrong!");
    }
  }

  /**
   * Fetch a single contact by `id`
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