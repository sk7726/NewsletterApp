const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/56bfbfae02";
    const options = {
        method: 'POST',
        auth: "Samadur1:14b08309a47140e70ba6fcf49d18a2a2-us21"
        
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) =>{
            // console.log(typeof(JSON.parse(data).errors));
        })

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
            
        }else
        {
            res.sendFile(__dirname + "/failure.html")
            
        }
    })

    request.write(jsonData);
    request.end();
    
})

app.post('/failure', (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
})

// d46662b98133e34e1c3dfef679e8a91d-us21   Api key
// 56bfbfae02  id 