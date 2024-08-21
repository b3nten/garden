import "./🌍globals.js"
import { App } from '@tinyhttp/app'
import { fileURLToPath } from 'url'
import path from 'path'
import sirv from "sirv"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

const shell = (args) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href='/${META.css}'>
  <script type='module' src='/${META.entry}'></script>
  <title>${args.title}</title>
</head>
<body>
	<app-entry>${JSON.stringify((args.data))}</app-entry>
</body>
</html>
`

const app = new App()

app.use(sirv(currentDirectory + "/public"))

app.get("/posts.aspx", (req, res) => {
	res.send("Hello from posts.aspx")
})

app.get("/posts/:id", (req, res) => {
	const post = req.params.id.split('.')[0]
	res.send(`Hello from post ${post}`)
})

app.use((req, res) => {
	const data = {
		title: "Hello from server",
		name: "John"
	}
	res.append('Content-Type', 'text/html')
	res.send(shell({ title: "Hello from server", data }))
})


app.listen(8000)