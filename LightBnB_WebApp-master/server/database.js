const properties = require('./json/properties.json');
const users = require('./json/users.json');

//connection to lightbnb database
const{Pool} = require('pg');
const pool = new Pool({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'lightbnb'
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) { 
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1`
    ,[email])
    .then(data => {
      if(data.rows.length > 0){
       return data.rows[0];
      } 
      return null;
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool.query(`
    SELECT * FROM users
    WHERE id = $1`
    ,[id])
    .then(data => {
      if(data.rows.length > 0){
       return data.rows[0];
      } 
      return null;
    });
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */ 
const addUser =  function(user) {
  const text = 'INSERT INTO users(name, email,password) VALUES($1, $2, $3) RETURNING *'
  const values = [user.name, user.email, user.password];
  return pool.query(text,values)
    .then(data => {
      if(data.rows.length > 0){
       return data.rows[0];
      } 
      return null;
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`
    SELECT P.*,R.*,AVG(rating) as average_rating
    FROM reservations R 
    JOIN properties P ON R.property_id = P.id
    JOIN property_reviews PR on P.id = R.property_id
    WHERE R.guest_id = $1 AND end_date < now()
    GROUP BY P.id,R.id
    ORDER BY R.start_date
    LIMIT $2;`
    , [guest_id,limit])
  .then(data => data.rows);  
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) { 
  let queryParameters = [];
  let queryString = `
    SELECT P.*, AVG(PR.rating) AS average_rating
    FROM properties P
    JOIN property_reviews PR ON P.id = PR.property_id`;

  if(options.city) {
    queryParameters.push(`%${options.city}%`);
    queryString += ` WHERE city like $${queryParameters.length}`;
  }  
  if(options.owner_id){
    (queryParameters.length === 0) ? queryString += ` WHERE` : queryString += ' AND';
    queryParameters.push(`${options.owner_id}`);
    queryString += ` P.owner_id = $${queryParameters.length}`;
  }
  if(options. minimum_price_per_night){
    (queryParameters.length === 0) ? queryString += ` WHERE` : queryString += ' AND';
    queryParameters.push(options.minimum_price_per_night);
    queryString += ` P.cost_per_night >= $${queryParameters.length}`;
  }
  if(options. maximum_price_per_night){
    (queryParameters.length === 0) ? queryString += ` WHERE` : queryString += ' AND';
    queryParameters.push(options.maximum_price_per_night);
    queryString += ` P.cost_per_night <= $${queryParameters.length}`;
  }
  
   
  
  queryString += `
  GROUP by P.id`;
  if(options.minimum_rating){    
    queryParameters.push(Number(options.minimum_rating));
    queryString += ` HAVING AVG(PR.rating) >= $${queryParameters.length}`;
  } 

  queryParameters.push(limit);
  queryString +=`
  ORDER by P.cost_per_night
  LIMIT $${queryParameters.length};`;   
  
  return pool.query(queryString,queryParameters)
  .then(data => data.rows);  
}
exports.getAllProperties = getAllProperties;
    

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  let queryString = `
    INSERT INTO properties (`;
  queryString += `${Object.keys(property).join(',')})`;
  queryString +=`  VALUES 
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`;

  let queryParameters = [];   
  for(let k in property){
    queryParameters.push(property[k]);
  }  
    
  return pool.query(queryString,queryParameters)
  .then(data => data.rows[0]);
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
