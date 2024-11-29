/*********************************************************************************/
/* Objetivo: API para manipular dados de cursos e alunos da Lion School          */
/* Data: 22/11/2024                                                             */
/* Autor: Lucas                                                                 */
/* Versão: 1.0                                                                  */
/***********************************************************************************/

// Importação das bibliotecas para criação da API
const express = require('express');
const cors = require('cors');

// Importando as funções de manipulação de cursos e alunos
const { 
    getCursos,
    //getCursoPorId,
    getAlunos,
    getAlunosPorMatricula,
    getAlunosPorCurso,
    getAlunosPorStatus,
    //getAlunosPorAnoConclusao,
    //getAlunosPorCursoEStatus,
    //getAlunosPorCursoEAnoConclusao
} = require('./funcoes');

// Inicializando o express através do objeto app
const app = express();

// Configurações de permissões da API
app.use(cors());
app.use(express.json()); // Para permitir o envio de dados no corpo das requisições

// Configuração de permissão genérica
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*'); // Permissão pública
    response.header('Access-Control-Allow-Methods', 'GET, POST'); // Métodos permitidos
    next();
});

// ENDPOINTS

// 1. Listar todos os cursos
app.get('/v1/lion-school/cursos', async (req, res) => {
    const cursosData = getCursos(); // Chama a função
    console.log('Cursos retornados pelo endpoint:', cursosData); // Log dos dados
    if (cursosData.cursos.length > 0) {
        res.status(200).json(cursosData.cursos);
    } else {
        res.status(404).json({ message: 'Nenhum curso encontrado.' });
    }
});


// 2. Listar todos os alunos
app.get('/v1/lion-school/alunos', async (req, res) => {
    const alunosData = getAlunos(); // Usando a função getAlunos
    if (alunosData.alunos.length > 0) {
        res.status(200).json(alunosData.alunos);
    } else {
        res.status(404).json({ message: 'Nenhum aluno encontrado.' });
    }
});

// 3. Buscar aluno por matrícula
app.get('/v1/lion-school/alunos/:matricula', async (req, res) => {
    const matricula = req.params.matricula;
    const aluno = getAlunosPorMatricula(matricula); // Usando a função getAlunosPorMatricula

    if (aluno) {
        res.status(200).json(aluno);
    } else {
        res.status(404).json({ status: 404, message: 'Aluno não encontrado.' });
    }
});

// 4. Filtrar alunos por curso
app.get('/v1/lion-school/alunos/cursos/:curso', async (req, res) => {
    const curso = req.params.curso;
    const alunosCurso = getAlunosPorCurso(curso); // Usando a função getAlunosPorCurso

    if (alunosCurso) {
        res.status(200).json(alunosCurso);
    } else {
        res.status(404).json({ status: 404, message: 'Nenhum aluno encontrado para o curso especificado.' });
    }
});

// 5. Recupera lista de alunos por status
app.get('/v1/lion-school/alunos/filtro', (req, res) => {
    const { status } = req.query;

    if (!status) {
        return res.status(400).json({ mensagem: 'O parâmetro "status" é obrigatório.' });
    }

    const resultado = getAlunosPorStatus(status);

    if (resultado.quantidade === 0) {
        return res.status(404).json({ mensagem: 'Nenhum aluno encontrado com o status especificado.' });
    }

    res.status(200).json(resultado);
});


// Configurando a porta para rodar a API
app.listen(8081, () => {
    console.log('API Lion School rodando nessa porra')
})
