import express from "express";
import Connection from './database/db.js ';
import bodyParser from "body-parser";
import mongoose from "mongoose";


// const _ = require('lodash');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const noteSchema = {
    title: String,
    content: String
};

const Note = mongoose.model('note', noteSchema);

app.get('/', (req, res) => { res.redirect('/api') });


app.get('/api', (req, res) => {
    // res.send('hello from server');
    Note.find({}, (err, fitems) => {
        if (err)
            console.log(err);
        else
            res.json(fitems);
    })
});
app.post('/api', (req, res) => {
    const tempTitle = req.body.title;
    const tempContent = req.body.content;
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
    res.redirect('/api');

})

Connection();
app.listen(5000, () => {
    console.log('server connected at 5000');
})
