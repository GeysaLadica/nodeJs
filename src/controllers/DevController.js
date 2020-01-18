const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store (request,response){  //async = aguardar a api do git responder
        const { github_username, techs, latitude, longitude } = request.body; //body é o corpo da requisição testado no insomnia

        let dev = await Dev.findOne({github_username});

        
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //entre crases
   
        const {name = login, avatar_url, bio} = apiResponse.data; // o "=" atribiu o valor padrão de login caso nome não exista
        const techsArray = techs.split(',').map(tech => tech.trim()); //map percorre, "=>" para cada tech remove espaçamentos
                
        const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        return response.json(dev);
    }
}