const express = require('express');
const swagger2openapi = require('swagger2openapi');
const yaml = require('yamljs');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use((req, res, next) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        try {
            // Try parsing as JSON first
            req.body = JSON.parse(data);
        } catch (e) {
            try {
                // If JSON parsing fails, try parsing as YAML
                req.body = yaml.parse(data);
            } catch (e) {
                return res.status(400).send('Invalid data format');
            }
        }
        next();
    });
});

app.post('/convert', (req, res) => {
    const swaggerContent = req.body;

    swagger2openapi.convertObj(swaggerContent, {}, (err, converted) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // Respond with YAML
            const yamlString = yaml.stringify(converted.openapi, 10, 4);
            res.type('yaml').send(yamlString);
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Swagger conversion server running on port ${port}`);
});
