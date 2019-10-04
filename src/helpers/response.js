export default class Response {
    /**
     * Handles http response
     *
     * @static
     * @param {object} res - Express response object
     * @param {object} date - The response payload (data resource)
     * @param {string} message - The response message
     * @param {number} code - The response status code
     * @returns {object} HTTP response
     * @memberof Response
     */
    static send(res, data, message, code = 200) {
      return res.status(code).json({
        success: true,
        message,
        data,
      });
    }
  
    /**
     * Send http error response
     *
     * @static
     * @param {object} res - Express response object
     * @param {object} error - Error object
     * @returns {object} HTTP error response
     * @memberof Response
     */
    static sendError(res, error) {
      const {
        statusCode = 500,
        message,
        errors,
      } = error;
  
      return res.status(statusCode).json({
        success: false,
        message,
        errors,
      });
    }


    /**
 * Sends a success response to the client
 * @param {Response} res Response object
 * @param {object} data data to send
 * @param {number} statusCode status code
 * @returns {Response} success response
 */
  static successResponse(res, data , message, statusCode = 200) {
    return  res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  
  } 
  /**
  * Sends an error response to the client
  * @param {Response} res Response object
  * @param {Array} errors error messages
  * @param {number} statusCode status code
  * @returns {Response} error response
  */
  static errorResponse  (res, errors = ['An error ocurred'], statusCode = 500) {
    return res
    .status(statusCode)
    .json({ errors: errors instanceof Array ? errors : [errors] });
  } 


}