import fs from 'fs'
import {parse} from 'csv-parse';
import { stringify } from 'csv-stringify'
const port = 3000;
const baseUrl = `http://localhost:${port}`

export function modifieAddressView(req, res) {
    const addressID = req.params.id;
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
                    const addressOfID = result.find(result => result[0] === addressID);
                    res.render('modifieaddress.ejs', {baseUrl: baseUrl, address : addressOfID})
                }
            })
        }
    })
}

export function modifieAddressSubmit(req, res) {  
    const addressID = req.params.id;
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
                    const addressOfID = result.find(result => result[0] === addressID);
                    const newAddress = [ addressOfID[0], req.body.civilite, req.body.nom, req.body.prenom, req.body.telephone,req.body.mail, req.body.date]

                    const index = result.findIndex(ligne => ligne[0] === addressID);
                    result[index] = newAddress;

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