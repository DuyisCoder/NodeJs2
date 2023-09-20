import connection from "../config/database";
const homePage = async (req, res) => {
    let data = [];
    // connection.query(
    //     'SELECT * FROM `Users`',
    //     function (err, results, fields) {
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 lastName: row.lastName,
    //                 firstName: row.firstName,
    //                 email: row.email,
    //                 address: row.address
    //             })
    //         })
    //         res.render('index.ejs', { dataUsers: data });
    //     }
    // );

    const [results, fields] = await connection.query(`Select * from Users`);
    res.render('index.ejs', { dataUsers: results });

}
const aboutPage = (req, res) => {
    res.send('About');
}

const detailUser = async (req, res) => {
    let userId = req.params.id;
    const [results, fields] = await connection.query(`Select * from Users where id= ?`, [userId]);
    res.send('hi');
}
module.exports = {
    homePage, aboutPage, detailUser
}