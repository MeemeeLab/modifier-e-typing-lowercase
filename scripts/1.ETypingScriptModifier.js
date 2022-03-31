import fs from 'fs';

export default {
    match: /\/app\/jsa_std\/js\/app\.min\.js\?.*/,
    response: (req, res, requestProxy) => {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': fs.statSync('./../data/app.min.js').size,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
            });
            fs.createReadStream('./../data/app.min.js').pipe(res);
        } else requestProxy(true);
    }
}
