
export default async function createMailContact(req, res) {
    const { name, email} = JSON.parse(req.body)
const mailjet = require ('node-mailjet')
	.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
const request = mailjet
	.post("contact")
	.request({
        "Email": email,
	    "Name": name
	})
request
	.then((result) => {
		console.log(result.body)
	})
	.catch((err) => {
		console.log(err.statusCode)
    })
    
}