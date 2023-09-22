import connection from "../config/database"
const getAllUsers = async (req, res) => {
    const [results, field] = await connection.query('SELECT*FROM Users ');
    return res.status(200).json({
        message: 'ok',
        data: results
    })
}
const createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(404).json({
            message: 'Thông tin không đầy đủ'
        })
    }
    const [results, field] = await connection.query(
        ' INSERT INTO `Users` ( `firstName`, `lastName`, `email`, `address`) VALUES(?,?,?,?) '
        , [firstName, lastName, email, address]);
    return res.status(200).json({ message: 'Tạo thành công!' });
}
const updateUser = async (req, res) => {
    let { firstName, lastName, email, address, userId } = req.body;
    if (!firstName || !lastName || !email || !address || !userId) {
        return res.status(200).json({
            message: 'Thông tin không đầy đủ'
        })
    }
    const [results, field] = await connection.query(
        `UPDATE Users
        SET firstName=?,lastName=?,email=?,address=?
        where id=?`
        , [firstName, lastName, email, address, userId]);
    return res.status(200).json({ message: 'Cập nhật thành công!' });
}
const deleteUser = async (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    const [results, field] = await connection.query(
        ' DELETE FROM `Users` where id = ?'
        , [userId]);
    return res.status(200).json({ message: 'Xóa thành công!' });
}
module.exports = {
    getAllUsers, createUser, updateUser, deleteUser
}