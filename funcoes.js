/**************************************************************************************************************************
* Objetivo: Atividade final de back-end
* Data:04/12/2024
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

var apiAlunos = require('./alunos.js')
var apiCursos = require('./cursos.js')

const getListaCursos = function() {
    let listaCursos = apiCursos.cursos
    let cursosFormatados = listaCursos.map(function(curso) {
        return {
            nome: curso.nome,
            sigla: curso.sigla,
            icone: curso.icone,
            cargaHoraria: curso.carga
        }
    })
    return cursosFormatados
}

const getListaAlunos = function() {
    let listaAlunos = apiAlunos.alunos
    let alunosFormatados = listaAlunos.map(function(aluno) {
        return {
            foto: aluno.foto,
            nome: aluno.nome,
            matricula: aluno.matricula,
            sexo: aluno.sexo
        }
    })
    return alunosFormatados
}

const getAlunoPorMatricula = function(numeroMatricula) {
    let alunoEncontrado = null
    let listaAlunos = apiAlunos.alunos

    listaAlunos.forEach(function(aluno) {
        if (aluno.matricula == numeroMatricula) {
            alunoEncontrado = {
                foto: aluno.foto,
                nome: aluno.nome,
                matricula: aluno.matricula,
                sexo: aluno.sexo
            }
        }
    })
    return alunoEncontrado || false
}

const getAlunosPorCurso = function(siglaCurso) {
    let listaAlunos = apiAlunos.alunos
    let alunosFiltrados = []

    listaAlunos.forEach(function(aluno) {
        aluno.curso.forEach(function(curso) {
            if (curso.sigla == siglaCurso) {
                alunosFiltrados.push({
                    foto: aluno.foto,
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo
                })
            }
        })
    })
    return alunosFiltrados
}

const getAlunosPorStatus = function(status) {
    let listaAlunos = apiAlunos.alunos
    let alunosFiltrados = []

    listaAlunos.forEach(function(aluno) {
        if (aluno.status == status) {
            alunosFiltrados.push({
                foto: aluno.foto,
                nome: aluno.nome,
                matricula: aluno.matricula,
                sexo: aluno.sexo
            })
        }
    })
    return alunosFiltrados
}

const getAlunosPorCursoEStatus = function(siglaCurso, statusDisciplina) {
    let listaAlunos = apiAlunos.alunos
    let alunosFiltrados = []

    listaAlunos.forEach(function(aluno) {
        aluno.curso.forEach(function(curso) {
            if (curso.sigla == siglaCurso) {
                curso.disciplinas.forEach(function(disciplina) {
                    if (disciplina.status == statusDisciplina) {
                        alunosFiltrados.push({
                            foto: aluno.foto,
                            nome: aluno.nome,
                            matricula: aluno.matricula,
                            sexo: aluno.sexo
                        })
                    }
                })
            }
        })
    })
    return alunosFiltrados
}

const getAlunosPorAnoConclusao = function(siglaCurso, anoConclusao) {
    let listaAlunos = apiAlunos.alunos
    let alunosFiltrados = []

    listaAlunos.forEach(function(aluno) {
        aluno.curso.forEach(function(curso) {
            if (curso.sigla == siglaCurso && curso.conclusao == anoConclusao) {
                alunosFiltrados.push({
                    foto: aluno.foto,
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo
                })
            }
        })
    })
    return alunosFiltrados
}

//console.log(getListaCursos())
//console.log(getListaAlunos())
//console.log(getAlunoPorMatricula("20151001016"))
//console.log(getAlunosPorCurso('ds'))
//console.log(getAlunosPorStatus('Cursando'))
//console.log(getAlunosPorCursoEStatus("ds", "Cursando"))
//console.log(getAlunosPorAnoConclusao("ds", "2023"));

module.exports = {
    getListaCursos,
    getListaAlunos,
    getAlunoPorMatricula,
    getAlunosPorCurso,
    getAlunosPorStatus,
    getAlunosPorCursoEStatus,
    getAlunosPorAnoConclusao
}
