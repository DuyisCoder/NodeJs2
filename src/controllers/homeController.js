import connection from "../config/database";
import multer from "multer";
import path from 'path'
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
const createPage = async (req, res) => {
    res.render('createUser.ejs');
}
const createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    const [results, field] = await connection.query(
        ' INSERT INTO `Users` ( `firstName`, `lastName`, `email`, `address`) VALUES(?,?,?,?) '
        , [firstName, lastName, email, address]);

    res.redirect('/');

}
const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    console.log('delete id :', userId);
    const [results, field] = await connection.query(
        ' DELETE FROM `Users` where id = ?'
        , [userId]);
    res.redirect('/');
}
const editPage = async (req, res) => {
    const userId = req.params.id;
    const [user] = await connection.query('SELECT * FROM Users where id=?', [userId])
    res.render('edit.ejs', { user: user[0] });
}
const editUser = async (req, res) => {
    let { firstName, lastName, email, address, userId } = req.body;

    const [results, field] = await connection.query(
        `UPDATE Users
        SET firstName=?,lastName=?,email=?,address=?
        where id=?`
        , [firstName, lastName, email, address, userId]);
    res.redirect('/');
}
const uploadFilePage = (req, res) => {
    res.render('uploadFile.ejs');
}
const upload = multer().single('profile_pic');

const handleUploadFile = async (req, res) => {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}
const uploadMultipleFile = multer().array('multiple_images');
const handleUploadMultipleFile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log(files);
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);

}
module.exports = {
    homePage, aboutPage, detailUser, createPage,
    createUser, deleteUser, editPage, editUser,
    uploadFilePage, handleUploadFile, handleUploadMultipleFile
}