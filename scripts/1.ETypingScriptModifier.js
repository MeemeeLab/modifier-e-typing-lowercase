import fs from 'fs';

export default {
    match: /\/app\/jsa_std\/js\/app\.min\.js.*/g,
    response: (req, res, requestProxy) => {
        if (req.method === 'GET') {
            fs.createReadStream('./../data/app.min.js').pipe(res);
        } else requestProxy(true);
    }
}
