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

// Change the layout of the checkboxes
let mode_vertical = false
const args = process.argv.slice(2)
if (args[0] === '--vertical') {
    mode_vertical = true
}

console.log(`<!DOCTYPE html>
<html lang="en">`)

// Head
console.log(`
    <head>
        <title>Dossier de formation de</title>
        <script
            src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
            integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
            crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
            body {
                width: 60%;
                justify-content: center;
                margin: auto;
            }
            table, tr, td {
                font-size: 10pt;
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
                writing-mode: vertical-rl;
                /*text-orientation: sideways;*/
                transform:scale(-1);
            }
            .no-padding {
                padding: 0;
            }
            .module {
                width: 50%;
            }
            .modulesEcolePro, .modulesCoursInter {
                width: 25%;
            }
            .main-table tr:last-child td  {
                border-bottom: 0 !important;
            }
            .objectifs-check {
                font-size: 9pt;
                vertical-align: baseline;
            }
            input {
                transform: scale(0.9);
            }
            #dossier-name {
                display: inline-block;
                min-width: 200px;
            }
            h3 {
                padding-top: 1em;
            }
            .custom-file-upload {
                margin-top: 9px;
                cursor: pointer;
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
        <h1>Dossier de formation de <span id="dossier-name" contenteditable="true">Prénom Nom (changez-moi)</span></h1>`)

if (mode_vertical) {
    console.log(`
            <div style="float: right"><a href="index.html">horizontal</a></div>`)
} else {
    console.log(`
            <div style="float: right"><a href="index-vertical.html">vertical</a></div>`)
}
console.log(`
        <button id="export-button" class="btn btn-primary">Export to JSON</button>
        <label class ="custom-file-upload btn btn-primary">Import JSON<input class="d-none" type="file" id="import-file"/></label>`)

for (domaineDeCompetance of data) {
    for (competence of domaineDeCompetance.competences) {
        let verticalColspan = mode_vertical ? 4 : 2
        console.log(`
        <h3>${competence.title}: ${competence.subject}</h3>
        <div>${renderMarkdown(competence.description)}</div>

        <table class="main-table external-border">
            <tr>
                <th class="main-th border-bottom" colspan="${verticalColspan}">Objectifs évaluateurs entreprise</th>
                <th class="main-th border-bottom">Modules école professionnelle</th>
                <th class="main-th border-bottom">Modules cours interentreprises</th>
            </tr>`)
        if (mode_vertical) {
            console.log(`
            <tr>
                <td class="border-bottom border-right">&nbsp;</td>
                <td class="vericaltext border-bottom border-right no-padding">expliqué</td>
                <td class="vericaltext border-bottom border-right no-padding">exercé</td>
                <td class="vericaltext border-bottom border-right no-padding">autonome</td>
                <td class="border-bottom border-right">&nbsp;</td>
                <td class="border-bottom">&nbsp;</td>
            </tr>`)
        }
        let alreadyDisplayModuleEcolePro = false
        let alreadyDisplayModuleCoursInter = false
        for (objectif of competence["Objectifs évaluateurs entreprise"]) {
            if (mode_vertical) {
                console.log(`
                <tr>
                    <td class="module border-bottom"><p>${objectif.id}: ${objectif.descr}</p></td>
                    <td class="border-bottom"><input id="${cleanId(objectif.id)}_explique" type="checkbox" /></td>
                    <td class="border-bottom"><input id="${cleanId(objectif.id)}_exerce" type="checkbox" /></td>
                    <td class="border-bottom border-right"><input id="${cleanId(objectif.id)}_autonome" type="checkbox" /></td>`)
            } else {
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
                                <td class="objectifs-check">
                                    <label for="${cleanId(objectif.id)}_explique">Expliqué</label>
                                </td>
                                <td><input id="${cleanId(objectif.id)}_explique" type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td class="objectifs-check">
                                    <label for="${cleanId(objectif.id)}_exerce">Exercé</label>
                                </td>
                                <td><input id="${cleanId(objectif.id)}_exerce" type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td class="objectifs-check">
                                    <label for="${cleanId(objectif.id)}_autonome">Autonome</label>
                                </td>
                                <td><input id="${cleanId(objectif.id)}_autonome" type="checkbox" /></td>
                            </tr>
                        </table>
                    </td>`)
            }

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

const version = require('./package.json').version
console.log(`
    </body>
    <footer class="pt-3">
        <p>Coded with ❤ by <a href="https://github.com/Azecko" target="_blank">Azecko</a>
        <br><small class="version"></small></p>
    </footer>
    <script>
        const dossierFormationVarName = 'dossier-formation-properties'
        const setLocalStorage = () => {
            var localStorageItems = {}
            var dossierName = $('#dossier-name').text()
            document.title = 'Dossier de formation de ' + dossierName
            localStorageItems['name'] = dossierName
            localStorageItems[dossierFormationVarName] = true
            localStorageItems['dossier-formation-version'] = '${version}'
            $('input[type=checkbox]').each(function () {
                localStorageItems[$(this).attr('id')] = this.checked
            })
            localStorage.setItem(dossierFormationVarName, JSON.stringify(localStorageItems, null, 2))
        }
        var dossierFormationLocalStorage = localStorage.getItem(dossierFormationVarName)
        if(!dossierFormationLocalStorage) {
            setLocalStorage()
        } else {
            $('input[type=checkbox]').each(function () {
                $(this).prop('checked', JSON.parse(dossierFormationLocalStorage)[$(this).attr('id')])
            })
            $('#dossier-name').text(JSON.parse(dossierFormationLocalStorage)['name'])
            document.title = 'Dossier de formation de ' + JSON.parse(dossierFormationLocalStorage)['name']
        }

        $('input:checkbox').change(
            function(){
                setLocalStorage()
        })

        document.getElementById("dossier-name").addEventListener("input", inputEvt => {
            setLocalStorage()
          }, false)

        // https://stackoverflow.com/a/18197341
        function download(filename, text) {
            var element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
            element.setAttribute('download', filename)

            element.style.display = 'none'
            document.body.appendChild(element)

            element.click()
            document.body.removeChild(element)
        }

        $('#export-button').click(function() {
            var dossierFormationLocalStorage = localStorage.getItem(dossierFormationVarName)
            var date = new Date()
            var name = JSON.parse(dossierFormationLocalStorage)['name'].replaceAll(/\s\s+/g, '_').replaceAll(' ', '_')
            download("dossier_formation_" + name + "_" + date.toISOString().split('T')[0] + ".json", localStorage.getItem(dossierFormationVarName))
        })

        document.getElementById('import-file').addEventListener('change', handleFileSelect, false)

        // https://stackoverflow.com/a/56737666
        function handleFileSelect(event) {
            const reader = new FileReader()
            reader.onload = handleFileLoad
            reader.readAsText(event.target.files[0])
        }

        // https://stackoverflow.com/a/3710226
        function isJsonString(str) {
            try {
                JSON.parse(str)
            } catch (e) {
                return false
            }
            return true
        }

        function handleFileLoad(event) {
            let confirm = window.confirm("Voulez-vous vraiment importer les données de ce fichier ?")
            if(confirm) {
                var resultObject = JSON.parse(event.target.result)
                if(!resultObject[dossierFormationVarName] || !resultObject['dossier-formation-version']) {
                    alert("Merci d'importer un fichier JSON valide généré par le bouton Export to JSON.")
                } else {
                    localStorage.setItem(dossierFormationVarName, event.target.result)
                    window.location.reload()
                }
            }
        }

        $('.version').html('<a href="https://github.com/Azecko/dossier-formation" target="_blank">Dossier formation</a> | ${version}')
    </script>
</html>
`)
