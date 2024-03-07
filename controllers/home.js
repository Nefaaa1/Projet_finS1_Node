import fs from 'fs'
import {parse} from 'csv-parse';
const port = 3000;
const baseUrl = `http://localhost:${port}`

export default (req, res) => {
    fs.readFile('./public/data/address.csv', (err, content) =>{
        if (err) {
            res.writeHead(500, { "Content-type": "text/plain" })
            res.end('Internal Servor error: ', err)
        } else {
            parse(content, (error, result)=>{
                if (err) {
                    res.writeHead(500, { "Content-type": "text/plain" })
                    res.end('Internal Servor error: ', error)
                } else {
                    console.log(result)
                    res.render('index.ejs', {baseUrl: baseUrl, address : result})
                }
            })
        }
    })
}