import fs from 'fs'
import {parse} from 'csv-parse';
const port = 3000;
const baseUrl = `http://localhost:${port}`


export default (req, res) => {
    const idAddress = req.params.id;
    fs.readFile('./public/data/address.csv', (err, content) =>{
        if (err) {
            res.writeHead(500, { "Content-type": "text/plain" })
            res.end('Internal Servor error: ', err)
        } else {
            parse(content, (error, result)=>{
                if (error) {
                    res.writeHead(500, { "Content-type": "text/plain" })
                    res.end('Internal Servor error: ', error)
                } else {
                    const addressOfID = result.find(result => result[0] === idAddress);
                    res.render('address.ejs', {baseUrl: baseUrl, address : addressOfID})
                }
            })
        }
    })
}