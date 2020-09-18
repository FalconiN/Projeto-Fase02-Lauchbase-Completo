const express = require('express')
const nunjucks = require('nunjucks')
const videos = require("./data")

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server, 
    autoescape: false,
    noCache: true
})

server.get("/", (req, res)=>{ 
    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4D03AQErIHLeyv8uIQ/profile-displayphoto-shrink_100_100/0?e=1603929600&v=beta&t=Ry--hb5R5XToFpGC6fJHjcpg4RFgBur7XKbmCrTX-eE",
        name: "Natan Falconi",
        role: "Aluno - Rocketseat",
        description: 'Student Programmer. Sofrendo com os desafios e tentando entender as coisas com a <a href="https://rocketseat.com.br" target ="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/FalconiN" },
            { name: "Twitter", url: "https://twitter.com/NatanFalconi" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/natan-falconi/" }
        ]
    }

    return res.render("about", { about }) 
})

server.get("/portfolio", (req, res)=>{

    return res.render("portfolio", {items: videos})
})

server.get("/video", (req, res)=>{
    const id = req.query.id

    const video = videos.find(function(video){
        //também é possível fazer assim para retornar true e false
        // return video.id == id
        //})

        if (video.id == id){
            return true
        }
    })

    if (!video){
        return res.send("Video não encontrado")
    }

    return res.render("video", { item: video })
})

server.listen(5000, ()=>{
    console.log("server is running")
}) 