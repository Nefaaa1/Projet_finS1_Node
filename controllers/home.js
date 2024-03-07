const port = 3000;
const baseUrl = `http://localhost:${port}`

export default (req, res) => {
    res.render('index.ejs', {baseUrl: baseUrl})
}