const mysql = require("./mysqlConnect");
const jwt = require("jsonwebtoken");

get = async () => {
    const users = await mysql.query("SELECT * FROM user");
    return users;
}; 
 
login = async (data) => {
    sql = `SELECT * FROM user WHERE email='${data.email}' AND password='${data.password}'`;
    const users = await mysql.query(sql);
    result = null;
    if (users[0].id) {
        const id = users[0].id;
        var token = jwt.sign({ id }, "CIMOL", { expiresIn: 1800 });
        return result = { auth: true, token, user: users[0] };
    }
};

logout = (token) => {
    console.log("Fez logout, token cancelado!");
    return { auth: false, token: null };
};

//função que verifica se o JWT é ok
verifyJWT = (token) => {
    if (!token) {
        resp = { auth: false, message: "Token não informado." };
    }
    jwt.verify(token, "CIMOL", function (err, decoded) {
        if (err) {
            resp = { auth: false, message: "Token inválido." };
        }
        if (decoded) {
            resp = { auth: true, idUser: decoded.id };
        }
    });
    return resp;
};

module.exports = { get, login, logout, verifyJWT };
