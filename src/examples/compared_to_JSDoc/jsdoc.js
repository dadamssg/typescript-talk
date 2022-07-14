/**
 * @typedef {Object} SuccessResponse
 * @property {{
 * person: {
 *    firstName: string,
 *    lastName: string,
 *    email: string
 *}}} person
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error
 */

/**
 * @typedef {Promise<SuccessResponse | ErrorResponse>} ApiResponse
 */

/**
 * @param {string} id
 * @returns {ApiResponse}
 */
function getPerson(id) {
  if (Math.random() > 0.5) {
    return Promise.resolve({
      person: {
        firstName: "David",
        lastName: "Adams",
        middleName: "Cool",
      },
    });
  }
  return Promise.resolve({
    error: "AHHHH!",
  });
}

getPerson("123").then((res) => {
  const firstName = res.person.firstName;
  if (res.error) {
    console.log(res.person.firstName.toUpperCase());
  }
});
