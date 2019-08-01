if(process.env.NODE_ENV === 'productioni'){
    
    module.exports = {
        mongoURI: 'mongo "mongodb+srv://cluster0-b973f.mongodb.net/test" --username ahmed'
    }

} else {
        module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}