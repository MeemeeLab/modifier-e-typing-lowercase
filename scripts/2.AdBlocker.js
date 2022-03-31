const blacklist = /\r\n<script async='async' src='.*?googletagservices.*?'>.*?<\/div>\r\n/gs

function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}

export default {
    match: [
        '/',
        '/roma/check/',
        '/english',
        '/english/check',
        '/kana',
        '/kana/check',
    ],
    response: async (req, res, requestProxy) => {
        const proxyResponse = await requestProxy();
        if (!proxyResponse) return;
        const resp = await streamToString(proxyResponse.stream);
        const actualResp = resp.replaceAll(blacklist, '');
        res.writeHead(proxyResponse.statusCode, 
            Object.assign({}, proxyResponse.headers, {'content-length': actualResp.length}));
        res.end(actualResp);
    }
}
