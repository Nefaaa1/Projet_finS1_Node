import fs from 'fs'
import {parse} from 'csv-parse';
import { stringify } from 'csv-stringify'
const port = 3000;
const baseUrl = `http://localhost:${port}`

export function homeView(req, res) {
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
                        console.log(result[result.length -1][0])
                        res.render('index.ejs', {baseUrl: baseUrl, address : result})
                    }
                })
            }
    })
}

export function deleteAddress(req, res) {
    const idAddress = req.params.id;
    console.log('delete')
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
                    const index = result.findIndex(ligne => ligne[0] === idAddress);
                    result.splice(index, 1);
                    stringify(result, (strError, dataCSV) =>{
                        if (strError) {
                            res.writeHead(500, { "Content-type": "text/plain" })
                            res.end('Internal Servor error: ', strError)
                        } else {
                            fs.writeFile('./public/data/address.csv',dataCSV, 'utf8', (writeErr) =>{
                                if (writeErr) {
                                    res.writeHead(500, { "Content-type": "text/plain" })
                                    res.end('Internal Servor error: ', writeErr)
                                } else {
                                    console.log('delete ok')
                                    res.end();
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
