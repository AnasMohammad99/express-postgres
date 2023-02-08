const getUsers = 'SELECT * FROM users';
const addUser = "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3)";




export {
    getUsers,
    addUser
}