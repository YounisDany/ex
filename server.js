const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const jsonFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// قراءة البيانات من ملف JSON
app.get('/data', (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// كتابة البيانات إلى ملف JSON
app.post('/data', (req, res) => {
    const newData = req.body;
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            }
            res.status(200).send('Data added');
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
