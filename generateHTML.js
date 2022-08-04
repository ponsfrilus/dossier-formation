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
        <script
        src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
        integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
        crossorigin="anonymous"></script>
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
        <h1>Dossier formation</h1>
        
        <button id="export-button">Export to JSON</button>
        <input type="file" id="import-file"/>`)

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
    <script>
        const checkboxesSetLocalStorage = () => {
            var checkboxesList = {};
            $('input[type=checkbox]').each(function () {
                checkboxesList[$(this).attr('id')] = this.checked
            });
            localStorage.setItem('checkboxes', JSON.stringify(checkboxesList))
        }
        var checkboxesLocalStorage = localStorage.getItem('checkboxes');
        if(!checkboxesLocalStorage) {
            checkboxesSetLocalStorage()
        }

        $('input[type=checkbox]').each(function () {
                $(this).prop('checked', JSON.parse(checkboxesLocalStorage)[$(this).attr('id')])
        });

        $('input:checkbox').change(
            function(){
                checkboxesSetLocalStorage()
        });

        // https://stackoverflow.com/a/18197341
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        }

        $('#export-button').click(function() {
            download('dossier_formation_export.json', localStorage.getItem('checkboxes'));
        });

        document.getElementById('import-file').addEventListener('change', handleFileSelect, false);

        // https://stackoverflow.com/a/56737666
        function handleFileSelect(event) {
            const reader = new FileReader()
            reader.onload = handleFileLoad;
            reader.readAsText(event.target.files[0])
        }

        // https://stackoverflow.com/a/3710226
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function handleFileLoad(event) {
            let confirm = window.confirm("Voulez-vous vraiment importer les données de ce fichier ?")
            if(confirm) {
                /* Check si la string est un JSON valide, si la personne load un fichier JSON autre qu'un fichier généré
                par le site, ça l'écrira quand même dans le local storage MAIS le local storage sera récrit la prochaine fois
                qu'une checkbox sera cliquée, donc (normalement) ça fera le taff */
                if(!isJsonString(event.target.result)) {
                    return alert("Merci d'importer un fichier JSON valide généré par le bouton Export to JSON.")
                }
                localStorage.setItem('checkboxes', event.target.result)
                window.location.reload()
            }
        }
    </script>
</html>
`)