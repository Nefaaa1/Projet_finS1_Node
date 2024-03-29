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
                        res.render('index.ejs', {baseUrl: baseUrl, address : result})
                    }
                })
            }
    })
}

export function deleteAddress(req, res) {
    const { ids } = req.body;
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
                    ids.forEach((id) => {
                        const index = result.findIndex((ligne) => ligne[0] === id);
                        result.splice(index, 1);
                    });
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
