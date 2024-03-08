import fs from 'fs'
import {parse} from 'csv-parse';
import { stringify } from 'csv-stringify'
const port = 3000;
const baseUrl = `http://localhost:${port}`

export function addAddressView(req, res) {
    res.render('addaddress.ejs', {baseUrl: baseUrl})
}

export function addAddressSubmit(req, res) {  
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
                const newID = Number(result[result.length-1][0]) + 1
                const newAddress = [ `${newID}`, req.body.civilite, req.body.nom, req.body.prenom, req.body.telephone,req.body.mail, req.body.date]
                result.push(newAddress)
                console.log(result);

                stringify(result, (strError, dataCSV) =>{
                    if (strError) {
                        res.writeHead(500, { "Content-type": "text/plain" })
                        res.end('Internal Servor error: ', strError)
                    } else {
                        console.log(dataCSV);
                        fs.writeFile('./public/data/address.csv',dataCSV, 'utf8', (writeErr) =>{
                            if (writeErr) {
                                res.writeHead(500, { "Content-type": "text/plain" })
                                res.end('Internal Servor error: ', writeErr)
                            } else {
                            res.redirect('/');
                            }
                        })
                    }
                })
            }
        })
    }
})
}