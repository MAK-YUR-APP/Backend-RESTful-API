const connection = require('../configs/database')

module.exports = {
    createCity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE city AUTO_INCREMENT=0')
            connection.query(`INSERT INTO city SET ?`, data)
            connection.query(`SELECT city.*, province.name_province FROM city INNER JOIN province ON city.id_province = province.id`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    readCity: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT city.*, province.name_province FROM city INNER JOIN province ON city.id_province = province.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateCity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE city SET ? WHERE id = ?`, [data, data.id])
            connection.query('SELECT city.*, province.name_province FROM city INNER JOIN province ON city.id_province = province.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteCity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM city WHERE id = ?`, data)
            connection.query('SELECT * FROM city', (error, result) => {
                if (error) reject(new Error(error))
                connection.query('ALTER TABLE city DROP id')
                connection.query('ALTER TABLE city ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
                resolve(result)
            })
        })
    }
}