/*********************************************************************************/
/* Objetivo: API para manipular dados de cursos e alunos da Lion School          */
/* Data: 22/11/2024                                                             */
/* Autor: Lucas                                                                 */
/* Versão: 1.0                                                                  */
/***********************************************************************************/

const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    app.use(cors())
    next()
})

const escolaFunctions = require('./funcoes.js')

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response) {
    const { sigla, status, status2, anoConclusao } = request.query
    let dados

    if (status) {
        dados = escolaFunctions.getAlunosPorStatus(status)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse status' })
        }
    }
    if (sigla && status2) {
        dados = escolaFunctions.getAlunosPorCursoEStatus(sigla, status2)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse curso ou status' })
        }
    }
    if (sigla && anoConclusao) {
        dados = escolaFunctions.getAlunosPorAnoConclusao(sigla, anoConclusao)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse curso ou ano' })
        }
    }
    return response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum tipo de dado para retorno' })
})

app.get('/v1/lion-school/cursos', cors(), async function(request, response) {
    let dados = escolaFunctions.getListaCursos()
    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum curso para retorno' })
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request, response) {
    let dados = escolaFunctions.getListaAlunos()

    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno' })
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response) {
    let matricula = request.params.matricula
    let dados = escolaFunctions.getAlunoPorMatricula(matricula)

    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrada nenhuma matrícula para retorno' })
    }
})

app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function(request, response) {
    let siglaCurso = request.params.sigla.toUpperCase()
    let dados = escolaFunctions.getAlunosPorCurso(siglaCurso)

    if (dados) {
        response.status(200).json(dados)
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nenhum curso para retorno do aluno' })
    }
})

app.listen('8081', function() {
    console.log('API funcionando e aguardando requisições...')
})
