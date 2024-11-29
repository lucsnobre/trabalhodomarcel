// Importação dos dados dos cursos e alunos
const cursosData = require('./cursos.js');
const alunosData = require('./alunos.js');

// Função: Recupera todos os cursos
const getCursos = function() {
    if (!cursosData || !cursosData.cursos) {
        return { quantidade: 0, cursos: [] }; // Retorna vazio se os dados não forem encontrados
    }

    let listaFormatada = [];
    
    // Se houver cursos, formate-os
    cursosData.cursos.forEach((curso) => {
        listaFormatada.push({
            nome: curso.nome,
            sigla: curso.sigla,
            icone: curso.icone,
            carga: curso.carga
        });
    });

    // Caso a lista de cursos esteja vazia retorna 0
    if (listaFormatada.length === 0) {
        return { quantidade: 0, cursos: [] };
    }

    return {
        quantidade: listaFormatada.length,
        cursos: listaFormatada
    };
};


// Lista todos os alunos
const getAlunos = function() {
    let listaFormatada = [];
    alunosData.alunos.forEach((aluno) => {
        let cursos = [];
        aluno.curso.forEach((c) => {
            cursos.push({
                nome: c.nome,
                sigla: c.sigla,
                conclusao: c.conclusao
            });
        });
        listaFormatada.push({
            nome: aluno.nome,
            matricula: aluno.matricula,
            status: aluno.status,
            cursos: cursos
        });
    });

    return {
        quantidade: listaFormatada.length,
        alunos: listaFormatada
    };
};

// Fala as informações de um aluno por matrícula
const getAlunosPorMatricula = function(matricula) {
    let alunoEncontrado = null

    alunosData.alunos.forEach((aluno) => {
        if (aluno.matricula === matricula) {
            let cursos = []
            aluno.curso.forEach((c) => {
                cursos.push({
                    nome: c.nome,
                    sigla: c.sigla,
                    conclusao: c.conclusao
                })
            })
            alunoEncontrado = {
                nome: aluno.nome,
                matricula: aluno.matricula,
                status: aluno.status,
                cursos: cursos
            }
        }
    })

    return alunoEncontrado || false;
}

// Lista alunos por curso
const getAlunosPorCurso = function(siglaCurso) {
    let listaFiltrada = [];
    alunosData.alunos.forEach((aluno) => {
        let alunoTemCurso = false;

        aluno.curso.forEach((c) => {
            if (c.sigla.toUpperCase() === siglaCurso.toUpperCase()) {
                alunoTemCurso = true;
            }
        });

        if (alunoTemCurso) {
            listaFiltrada.push({
                nome: aluno.nome,
                matricula: aluno.matricula,
                status: aluno.status,
                cursos: aluno.curso
            });
        }
    });

    return {
        quantidade: listaFiltrada.length,
        alunos: listaFiltrada
    };
};

const getAlunosPorStatus = function (status_curso) {
    let listaFiltrada = [];

    if (!alunosData.alunos || alunosData.alunos.length === 0) {
        return { quantidade: 0, alunos: [] };
    }

    alunosData.alunos.forEach((aluno) => {
        if (aluno.status_curso && aluno.status_curso === status_curso) {
            listaFiltrada.push({
                nome: aluno.nome,
                matricula: aluno.matricula,
                status: aluno.status_curso,
                cursos: aluno.curso,
            });
        }
    });

    return {
        quantidade: listaFiltrada.length,
        alunos: listaFiltrada,
    };
};

const getAlunosPorCursoEStatus = function (curso, status) {
    let listaFiltrada = [];

    if (!alunosData.alunos || alunosData.alunos.length === 0) {
        return { quantidade: 0, alunos: [] };
    }

    alunosData.alunos.forEach((aluno) => {
        const alunoPossuiCurso = aluno.curso.some(c => c.sigla === curso);
        if (alunoPossuiCurso && aluno.status === status) {
            listaFiltrada.push({
                nome: aluno.nome,
                matricula: aluno.matricula,
                status: aluno.status,
                cursos: aluno.curso,
            });
        }
    });

    return {
        quantidade: listaFiltrada.length,
        alunos: listaFiltrada,
    };
};




module.exports = {
    getCursos,
    getAlunos,
    getAlunosPorMatricula,
    getAlunosPorCurso,
    getAlunosPorStatus,
    getAlunosPorCursoEStatus
};
