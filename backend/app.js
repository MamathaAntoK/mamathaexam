const express=require('express');
const app=express();

const path=require('path');

const morgan=require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static('./frontend'));


const cors=require('cors');
app.use(cors());

const mongoose=require('mongoose');
// const bodyParser=require('body-parser');

// app.use(bodyParser.json());

const PORT=7000;


mongoose.connect('mongodb+srv://admin:admin123@cluster0.qlazmk7.mongodb.net/libraryappdatas?retryWrites=true&w=majority')
.then(()=>{
    console.log(`Connection to Database established`);
})
.catch((error)=>{
    console.log(`Error in connecting to database ${error.message}`)
});


const librarySchema= new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    publicationyear:Number,
    isbn:Number
})
const library=mongoose.model('library',librarySchema);


app.get('/api/get',async(req,res)=>{
    try {
        const librarydata=await library.find();
        res.json(librarydata)
    } catch (error) {
        res.status(400).json({message:'server error'})
    }
})

app.post('/api/create',async(req,res)=>{
    try {
        const title=req.body.title;
        const author=req.body.author;
        const genre=req.body.genre;
        const publicationyear=req.body.publicationyear;
        const isbn=req.body.isbn;
        const librarydata=new library({title,author,genre,publicationyear,isbn});
        await librarydata.save();
        res.json(librarydata)

    } catch (error) {
       res.status(404).json({message:'server error'}) 
    }
})


app.put('/api/update/:id',async(req,res)=>{
    try {
       const id=req.params.id;
       const updateddata=req.body;
        const librarydata=await library.findByIdAndUpdate(id,updateddata);
        res.json(librarydata)

    } catch (error) {
       res.status(404).json({message:'server error'}) 
    }
})

app.delete('/api/delete/:id',async(req,res)=>{
    try {
       const id=req.params.id;
       const librarydata=await library.findByIdAndDelete(id);
       res.json({message:'it is deleted'});

        
    } catch (error) {
        res.status(404).json({message:'erver error'}) 
    }
})

app.get('')



app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/frontend/index.html'))
})

app.listen(PORT,()=>{
    console.log(`server runninhg on port ${PORT}`)
})
