import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';


const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.get('/api/articles/:name', async (req, res) => {

    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, });
        const db = client.db('test');
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo)
        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting", error });
    };

})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.listen(8000, () => console.log('listening port 8000'))
