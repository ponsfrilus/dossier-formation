const data = require('./data.json')
const marked = require("marked")

const renderMarkdown = (text) => {
    return marked.parse(text)
}

const cleanId = (id) => {
    return id.replace(".", "_")
}

const moduleLink = (moduleId) => {
    return `<a href="https://www.modulbaukasten.ch/module/${moduleId}/0/fr-FR" target="_blank">${moduleId}</a>`
}

console.log(`<!DOCTYPE html>
<html lang="en">`)

// Head
console.log(`
    <head>
        <title>Dossier formation</title>  
        <style>
            html {
                width: 60%;
                display: flex;
                justify-content: center;
                margin: auto;
            }
            table, tr, td {
                font-size: 9pt;
            }
            .external-border {
                border: 1px solid gray;
            }
            .main-th {
                padding: 15px;
            }
            .border-bottom {
                border-bottom: 1px solid gray; 
            }
            .border-right {
                border-right: 1px solid gray;
            }
            td {
                vertical-align: top;
                padding-left: 5px;
            }
            .vericaltext{
                writing-mode: vertical-lr;
                text-orientation: upright;
            }
            .module {
                width: 50%;
            }
            .modulesEcolePro, .modulesCoursInter {
                width: 25%;
            }
            #main-table tr:last-child td {
                border-bottom: 0;
            }
            .objectifs-check {
                font-size: 8pt;
                vertical-align: baseline;
            }
            input {
                transform: scale(0.8);
            }

            @media print {

                body {
                    margin: 0;
                    font-family: Serif;
                    font-size: 10pt;
                }

                html {
                    width: 100%;
                }
              
            }
        </style>
    </head>`)

// Body
console.log(`
    <body>
        <h1>Dossier formation</h1>`)

for (domaineDeCompetance of data) {
    for (competence of domaineDeCompetance.competences) {
        console.log(`
        <h3>${competence.title}: ${competence.subject}</h3>
        <p>${renderMarkdown(competence.description)}</p>

        <table id="main-table" class="external-border">
            <tr>
                <th class="main-th border-bottom" colspan="2">Objectifs évaluateurs entreprise</th>
                <th class="main-th border-bottom">Modules école professionnelle</th>
                <th class="main-th border-bottom">Modules cours interentreprises</th>
            </tr>`)
        let alreadyDisplayModuleEcolePro = false
        let alreadyDisplayModuleCoursInter = false
        for (objectif of competence["Objectifs évaluateurs entreprise"]) {
            console.log(`
            <tr>
                <td class="module border-bottom"><p>${objectif.id}: ${objectif.descr}</p></td>
                <td class="border-bottom border-right">
                    <table>
                        <tr>
                            <td class="border-bottom">Bloom</td>
                            <td class="border-bottom">${objectif.bloom}</td>
                        </tr>
                        <tr>
                            <td class="objectifs-check">Expliqué</td>
                            <td><input id="${cleanId(objectif.id)}_explique" type="checkbox" /></td>
                        </tr>
                        <tr>
                            <td class="objectifs-check">Exercé</td>
                            <td><input id="${cleanId(objectif.id)}_exerce" type="checkbox" /></td>
                        </tr>
                        <tr>
                            <td class="objectifs-check">Autonome</td>
                            <td><input id="${cleanId(objectif.id)}_autonome" type="checkbox" /></td>
                        </tr>
                    </table>
                </td>`)
            if(competence["Modules école professionnelle"] && !alreadyDisplayModuleEcolePro) {
                alreadyDisplayModuleEcolePro = true
                console.log(`                <td class="modulesEcolePro border-right" rowspan="${competence["Objectifs évaluateurs entreprise"].length}">`)
                for(moduleEcolePro of competence["Modules école professionnelle"]) {
                    console.log(`                    <p>${moduleLink(moduleEcolePro.id)}: ${moduleEcolePro.descr}</p>`)
                }
                console.log(`                </td>`)
            } else if(!competence["Modules école professionnelle"] && !alreadyDisplayModuleEcolePro){
                alreadyDisplayModuleEcolePro = true
                console.log(`                <td class="modulesEcolePro border-right" rowspan="${competence["Objectifs évaluateurs entreprise"].length}"></td>`)
            }

            if(competence["Modules cours interentreprises"] && !alreadyDisplayModuleCoursInter) {
                alreadyDisplayModuleCoursInter = true
                console.log(`                <td class="modulesCoursInter" rowspan="${competence["Objectifs évaluateurs entreprise"].length}">`)
                for(moduleCoursInter of competence["Modules cours interentreprises"]) {
                    console.log(`                    <p>${moduleLink(moduleCoursInter.id)}: ${moduleCoursInter.descr}</p>`)
                }
                console.log(`                </td>`)
            } else if(!competence["Modules cours interentreprises"] && !alreadyDisplayModuleCoursInter) {
                alreadyDisplayModuleCoursInter = true
                console.log(`                <td class="modulesCoursInter" rowspan="${competence["Objectifs évaluateurs entreprise"].length}"></td>`)
            }
            console.log(`            </tr>`)
        }
        console.log(`        </table>`)
    }
}

console.log(`
    </body>
</html>
`)