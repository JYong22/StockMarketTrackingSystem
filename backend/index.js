
const mysql = require('mysql'); //mysql
const express = require('express');
const cors = require("cors"); //cross origin
const app = express(); //express
var axios = require("axios").default;

const bcrypt = require('bcrypt');
const saltrounds = 10;

const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
    
}));

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
   extended: true
}))

app.use(session({
    key: "userId",
    secret: "stock",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60*60*2400
    },
})
);


const db = mysql.createConnection({ //connection to the mysql database
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'stockTracker'
});


db.connect(function(err){ //connect
    if(err) throw err;
    console.log('Database connected'); 
});



/*
* THESE ARE USED FOR USER REGISTRATION AND LOGIN
*
*
*
 */
app.post('/api/register', (req,res) =>{
    const username = req.body.username;  //recieves form username
    const password = req.body.password; //recieves form password
    
    bcrypt.hash(password, saltrounds, (err, hash) =>{ //encrypt password before inserting
        if (err){
            console.log(err); //console log error is there is
        }
        db.query(`INSERT INTO users (username,password) VALUES('${username}', '${hash}');`, //inserting into mysql database for users
            (err, result) =>{
                if (err){
                    console.log(err);
                    res.send({message: "Error"});
                }
                else {
                    db.query(`INSERT INTO Wallet (username,balance) VALUES('${username}', '${0}');`, (error, result) =>{ //create a user balance
                        if (error){
                            console.log(error);
                            res.send({message: "Error"});
                        }
                        else{
                            res.send({message: "Registered"})
                        }
                    })
                }

            }
        );
    })


   
});


app.post('/api/login', (req, res) =>{
    const username = req.body.username;  //recieves form username
    const password = req.body.password; //recieves form password

    db.query(`SELECT * FROM users WHERE username = '${username}';`,
    (err, result) =>{
        if (err){
            res.send({err: err})
        }

        if (result.length >0){//if there is a result password
            bcrypt.compare(password, result[0].password, (error, response) =>{ //compare password with the bcrypt variant
                if(response){
                    req.session.user = result;
                    res.send({login:"Logged In"});
                }
                else {
                    res.send({message: "Incorrect username or password."})
                }    
            });
        } 
        else {
            res.send({message: "Incorrect username or password."})
        }


    }
    )
});

app.get('/api/login', (req, res) =>{
    if (req.session.user){
        res.send({loggedIn: true, user: req.session.user}); //sends the loggedIn as true
    }
    else{
        res.send({loggedIn: false, user: req.session.user}); //sends the loggedIn as true
    }
    
});
app.get('/api/signout', (req,res) =>{
    res.clearCookie('userId').send("Signed out"); //clears the cookie when you click on the signout
})

/*
* THESE ARE USED FOR BALANCE
*
*
*
 */

app.get('/api/balance', (req,res) =>{//returns the balance
    
    if(req.session.user){
        const username = req.session.user[0].username;
        db.query(`SELECT balance FROM wallet WHERE username = '${username}';`,  //database query to get the balance
            (err, result) =>{
                if (err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            })
        }   
    else{
        res.send({message: ""})
    }

})
app.post('/api/balance', (req,res) =>{//adds the balance
    const balance = req.body.increase; //set the increase
    
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username; //username set
        db.query(` 
        UPDATE wallet
        SET balance = balance + ${balance}
        WHERE username = '${username}';`,  //database query to update the balance
            (err, result) =>{
                if (err){
                    console.log(err); 
                }
                else{
                    res.send({message:'Balance added'});
                }
            })
        
    }
    else{
        res.send({message: ""});
    }

});

app.post('/api/buyStock', (req,res) =>{
    
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username;
        const stock = req.body.stockName;
        const quantity = req.body.quantity;
        console.log(quantity + " " + stock);

        var options = {
            method: 'GET',
            url: 'https://twelve-data1.p.rapidapi.com/price',
            params: {symbol: stock, format: 'json', outputsize: '30'},
            headers: {
                'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                'x-rapidapi-key': '***'
            }
        };
        axios.request(options).then(function (response) { //axios request
        
            if (response.data.status){
                res.send({message: "Stock does not exist."}); //if stock doesnt exist
            }
            else{
                const a = Object.values(response.data); //gets the current stock price
                const price = Math.round((a[0] * 100) / 100).toFixed(0); //rounds stock price to nearest int
                db.query(`SELECT balance FROM wallet WHERE username = '${username}';`,  //check the balance
                    (err, result) =>{
                        
                        if(result[0].balance < (quantity * price)){ //if there is not enough balance then send message: not enough else continue
                            res.send({message: "Not enough funds."});
                        }
                        else{
                            db.query(`SELECT * FROM stockOwned WHERE username = '${username}' and stockName = '${stock}';`, //Find the stock that the user currently owns
            
                                (err,result) =>{
                                    if (result === undefined || result.length == 0){ //if does not own any then insert a new stock into database and update balance
                                        db.query(`INSERT INTO stockOwned (username, stockName, quantity) VALUES ('${username}', '${stock}', ${quantity});`,   
                                            (err, result) =>{
                                            }
                                        );
                                        db.query(
                                            `UPDATE wallet SET balance = balance - ${quantity*price} WHERE username = '${username}';`, 
                                            (err, result) =>{
                                            }
                                        );
                                        res.send({message: "Stock successfully purchased."})
                                    }
                                    else{ //if does own then update the stock and balance
                                        db.query(
                                            `UPDATE stockOwned SET quantity = quantity + ${quantity} WHERE username = '${username}' AND stockName = '${stock}';`, 
                                            (err, result) =>{
                                            }
                                        );
                                        db.query(
                                            `UPDATE wallet SET balance = balance - ${quantity*price} WHERE username = '${username}';`, 
                                            (err, result) =>{
                                            }
                                        );
                                        res.send({message: "Stock successfully purchased."})
                                    }
                                    
                                }
                            );
                        }
                    }
                );
                
            }
        });
    }

});


app.post('/api/sellStock', (req,res) =>{
    
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username;
        const stock = req.body.stockName;
        const quantity = req.body.quantity;


        db.query(`SELECT quantity FROM stockOwned WHERE username = '${username}' AND stockName = '${stock}';`,  //Check if there is any stock
            (err, result) =>{
                if (result === undefined || result.length == 0){  //if there is no result then send message
                    res.send({message: "Stock is not owned."})

                }
                else{ //if there is continue
                    if(quantity > result[0].quantity){
                        res.send({message: "You do not own "+quantity +" " + stock + " stocks"});
                    }
                    else{
                        var options = {
                            method: 'GET',
                            url: 'https://twelve-data1.p.rapidapi.com/price',
                            params: {symbol: stock, format: 'json', outputsize: '30'},
                            headers: {
                                'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                                'x-rapidapi-key': '***'
                            }
                        };
                        axios.request(options).then(function (response) { //axios request
                            const a = Object.values(response.data); //gets the current stock price
                            const price = Math.round((a[0] * 100) / 100).toFixed(0); //rounds stock price to nearest int
                                db.query(
                                    `UPDATE stockOwned SET quantity = quantity - ${quantity} WHERE username = '${username}' AND stockName = '${stock}';`,  //remove the amount being sold
                                    (err, result) =>{
                                    }
                                );
                                db.query(
                                    `UPDATE wallet SET balance = balance + ${quantity*price} WHERE username = '${username}';`,  //update wallet
                                    (err, result) =>{
                                    }
                                );
                                res.send({message: "Stock successfully sold."}) //send message
                            }
                        );
                    }

                }
            
            }
        );
    }
            

});


/*
* THESE ARE USED FOR SUBSCRIPTIONS
*
*
*
 */
app.post('/api/addSub', (req,res) =>{
    const stock = req.body.stockName;

    /*Fetches from the api */
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username; //username set
        console.log(username);
        var options = {
            method: 'GET',
            url: 'https://twelve-data1.p.rapidapi.com/price',
            params: {symbol: stock, format: 'json', outputsize: '30'},
            headers: {
                'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                'x-rapidapi-key': '***'
            }
        };
        axios.request(options).then(function (response) { //axios request
            
            if (response.data.status){
                res.send({message: stock+ " NOT FOUND."}); //if not found send message back
            }
            else{ //if a stock is found proceed
                db.query(`SELECT stock FROM subscription WHERE username = '${username}' AND stock = '${stock}';`,   //checks if there is a subscription for the stock
                    (err, result) =>{
                        if (err){
                            console.log(err);
                        }
                        else {
                            if (result === undefined || result.length == 0){ //if the stock is empty continue
                                
                                db.query(`INSERT INTO subscription (username,stock) VALUES('${username}', '${stock}');`, //insert statement
                                    (err, result) =>{
                                        if (err){
                                            console.log(err);
                                        }
                                        else
                                            res.send({message:"Subscription for " +stock + " added."});
                                    }
                                );
                            }
                            else{
                                res.send({message:"Already subscribed"});  //result isnt null then it returns a message;
                            }
                        }

                    }
                );
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
});

app.delete('/api/deleteSub/:stockName', (req,res) =>{


    if(req.session.user){ //if user session is active
        
        const username = req.session.user[0].username; //username set
        const stock = req.params.stockName;
        console.log(username);
        db.query(`DELETE FROM subscription WHERE username = '${username}' AND stock = '${stock}';`, //delete sub
            (err,result) =>{
                res.send({message:`${stock} removed from subscriptions.`})
            }
        );
    }

});

app.get('/api/subscription', (req,res) =>{
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username; //username set
        db.query(`SELECT stock FROM subscription WHERE username = '${username}';`,
            (err, result)=>{
                var arr = []; //set new array
                result.forEach((v)=>{ //push each stock name into an array
                    arr.push(v.stock);
                })
                if (arr === undefined || arr.length == 0){
                    res.send({});
                }
                else{
                    var options = { //get rid of the brackets for the array and set params to every stock
                        method: 'GET',
                        url: 'https://twelve-data1.p.rapidapi.com/price',
                        params: {symbol: arr.toString().replace("[", "").replace("}", ""), format: 'json', outputsize: '30'}, 
                        headers: {
                        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                        'x-rapidapi-key': '***'
                        }
                    };
                }
                
                
                axios.request(options).then(function (response) {
                
                    if (response.data.price != null){ //first one
                        var myObject = {};
                        var myVar = result[0].stock;
                        myObject[myVar] = response.data;

                        res.send(myObject);
                    }
                    else{
                        res.send(response.data); //send the data

                    }
                }).catch(function (error) {
                    console.error(error);
                });
                
            }
        );
    }


});

/*
* THIS ARE USED FOR STOCK DISPLAY
*
*
*
 */
app.get('/api/displayStock', (req,res) =>{
    if(req.session.user){ //if user session is active
        const username = req.session.user[0].username; //username set
        db.query(`SELECT stockName, quantity FROM stockOwned WHERE username = '${username}';`,
            (err, result) =>{
                console.log(result);
                var arr = []; //set new array
                result.forEach((v)=>{ //push each stock name into an array
                    arr.push(v.stockName);
                })
                var options = { //get rid of the brackets for the array and set params to every stock
                    method: 'GET',
                    url: 'https://twelve-data1.p.rapidapi.com/price',
                    params: {symbol: arr.toString().replace("[", "").replace("}", ""), format: 'json', outputsize: '30'}, 
                    headers: {
                    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
                    'x-rapidapi-key': '***'
                    }
                };
                
                axios.request(options).then(function (response) {
                    const a = Object.values(response.data); //gets the current stock price\
                    var responseArr = []; //response arr
                
                    result.forEach((v, index)=>{ 

                        if (a[index].price == null){
                            responseArr.push({"stock": v.stockName, "quantity": v.quantity, "total": (v.quantity*a[0])});

                        }
                        else{
                            responseArr.push({"stock": v.stockName, "quantity": v.quantity, "total": (v.quantity*a[index].price)});
                        }
                        
                    })
                    res.json(responseArr);
                }).catch(function (error) {
                    console.error(error);
                });


            }
        );
    }
});







 app.listen(3001, ()=>{
    console.log("running on port 3001");
 }); //listen to 3000
