import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const u = process.env.DB_USER;
const p = process.env.DB_PASSWORD;
const d = process.env.DB;

// const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URL = `mongodb+srv://todomongo:${p}@mern-todo.xjfnt2c.mongodb.net/todoDB?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connnction success'))
    .catch((err) => console.log(' ERROR FOUND : ') + err);

const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model('note', noteSchema);





app.get('/api', (req, res) => {
    // res.send('hello from server');
    Note.find({}, (err, fitems) => {
        if (err)
            console.log(err);
        else {
            console.log(fitems);
            res.json(fitems);
        }
    })
});
app.post('/api', (req, res) => {
    const tempTitle = req.body.title;
    const tempContent = req.body.content;
    console.log('called')
    const note = new Note({
        title: tempTitle,
        content: tempContent
    })
    note.save();
    res.redirect('/');
})


// import deleteRouter from './routes/delete.js';
// app.use('/delete', deleteRouter);

app.post('/delete', (req, res) => {
    const deleteId = req.body.did;
    Note.deleteOne({ _id: deleteId }, (err) => {
        if (err)
            console.log(err);
        else
            console.log('note deleted ');
    })
    res.redirect('/');

})

app.listen(PORT, () => {
    console.log('server connected at 5000');
})
