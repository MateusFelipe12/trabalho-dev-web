const express = require('express');
const router = express.Router();
const model = require('../../../model');


router.get(process.env.BASE_URL + '/api/v1/rest/reply',
    async function (req, resp){
        let data = null;
        const Reply = await model.reply.schema('public');
        data = await Reply.findAll();
        resp.json(data).status(200);
});

router.get(process.env.BASE_URL + '/api/v1/rest/reply/:id',
    async function (req, resp){
        let data = null;
        const id = req.params.id;
        const Reply = await model.reply.schema('public');
        data = await Reply.findByPk(id);
        resp.json(data).status(200);
});

router.get(process.env.BASE_URL + '/api/v1/rest/postreply/:id_post',
    async function (req, resp){
        let data = null;
        const id_post = req.params.id_post;
        const Reply = await model.reply.schema('public');
        try {
            data = await Reply.findAll({
                where: {
                    id_post: id_post
                }
            });
            resp.json(data).status(200);
        } catch (err){
            return resp.status(404).send({error: "Nenhuma resposta econtrada!"});
        }
});


router.post(process.env.BASE_URL + '/api/v1/rest/reply',
    async function (req, resp){
	    const Reply = await model.reply.schema('public');
        const data = req.body;
        try {
            console.log(data);
            result = await Reply.create(data);
            return resp.status(201).send({success: true, msg: 'Resposta criada com sucesso!'});
        } catch (err) {
            return resp.status(500).send({error: err});
        }
});

router.delete(
	process.env.BASE_URL + '/api/v1/rest/reply/:id',
	async function (req, resp) {
		const id = req.params.id;
		const Reply = await model.reply.schema('public');
		const data = await Reply.findByPk(id);
		if (!data) {
			return resp.status(404).send({error: 'Não encontrado'});
		}
		try {
            const antigo = {...data.dataValues};
			await data.destroy();
			return resp.send({success: true, msg: `Resposta ${antigo.nome} deletada com sucesso!`});
		} catch (error) {
			return resp.status(500).send({error});
		}
	},
);

module.exports = router;
