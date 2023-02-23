const {Pool} = require('pg'); 

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB ,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

async function getAllContent() {
    try {

        const res = await pool.query('SELECT * FROM anime_contents ORDER BY ID');
        return res.rows;    

    } catch (error) {
        console.log(error);
    }
}

async function getById(id) {
    try {
        const res = await pool.query('SELECT * FROM anime_contents WHERE id = $1', [id]);
        return res.rows;
    } catch(error) {
        console.log(error);
    }
}

async function create(urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription) {
    try {

        const {rows} = await pool.query(
            'INSERT INTO anime_contents (urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id', 
            [urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, Number(ageAnime), descriptionAnime, Number(episode), status, categories, originalSource, fullDescription]
            );

        return rows[0].id;

    } catch (error) {
        console.log(error);
    }
}

async function update(id, urlImage, urlWatch, urlAnime, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription) {
    try {

        const {rows} = await pool.query(
            'UPDATE anime_contents SET urlImage  = $1, urlAnime = $2, urlWatch = $3, nameAnime = $4, categoryAnime = $5, ageAnime = $6, descriptionAnime = $7, episode = $8, status = $9, categories = $10, originalsource = $11, fullDescription = $12  WHERE id = $13 RETURNING id', 
            [urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, Number(ageAnime), descriptionAnime, episode, status, categories, originalSource, fullDescription, id]
            );

        return rows[0].id;

    } catch (error) {
        console.log(error);
    }
}

async function deleteContent(id) {
    try {

        const {rows} = await pool.query(
            'DELETE FROM anime_contents WHERE id = $1 RETURNING id', 
            [id]
            );
            
        return rows[0].id;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllContent,
    getById,
    create,
    update,
    deleteContent,
    getById,
    create,
    update,
    deleteContent
}
