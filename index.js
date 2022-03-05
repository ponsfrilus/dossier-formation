// A very small script to generate a markdown file of the competence. 
// Usefull to validate the JSON in data.json
const data = require('./data.json')
const title = true
if (title) {
  // some jam for https://pandoc.org/MANUAL.html#extension-pandoc_title_block
  console.log('---')
  console.log('title: "Dossier de formation"')
  console.log('author: Jane Doe')
  console.log('date: "2022-03-04"')
  console.log('keywords: [apprentis, cfc, plan de formation, ict]')
  console.log('abstract: |')
  console.log('    Ce dossier de formation a pour but de se conformer à l\'article 12 de l\'Ordonnance du SEFRI sur la formation professionnelle initiale d\'informaticienne / informaticien avec certificat fédéral de capacité (CFC).')
  console.log('    ')
  console.log('    Pendant la formation à la pratique professionnelle, la personne en formation tient un dossier de formation dans lequel elle inscrit au fur et à mesure les travaux importants concernant les compétences opérationnelles à acquérir.')
  console.log('    Au moins une fois par semestre, le formateur contrôle et signe le dossier de formation et en discute avec la personne en formation.')
  console.log('    ')
  console.log('    https://www.ict-berufsbildung.ch/formation-initiale/apprentissages-ict/informaticienne-cfc')
  console.log('    ')
  console.log('    https://www.fedlex.admin.ch/eli/oc/2020/941/fr')
  console.log('    ')
  console.log('    https://www.ict-berufsbildung.ch/resources/Bildungsplan_Informatik-EFZ_BiVo-2021_FR1.pdf')
  console.log('    ')
  console.log('    https://www.ict-berufsbildung.ch/resources/Flyer_Informatik-fuer-Betriebe_FR.pdf')
  // console.log('header-includes: |')
  // console.log('    \\usepackage{fancyhdr}')
  console.log('---')

  // hack to have a blank page after title block and after TOC
  console.log('\\newpage{}')
  console.log('\\tableofcontents \\newpage{}')
  console.log('\n\n')
}

for (domaineDeCompetance of data) {
  console.log(`# ${domaineDeCompetance.title}: ${domaineDeCompetance.subject}\n`)
  for (competences of domaineDeCompetance.competences) {
    console.log(`## ${competences.title}: ${competences.subject}\n`)
    console.log(`${competences.description}\n\n`)
    console.log(`### Objectifs évaluateurs entreprise\n`)
    for (goals of competences['Objectifs évaluateurs entreprise']) {
      console.log(`   - ${goals.id} ${goals.descr}`)
    }
    console.log(`\n`)
    if (competences['Modules école professionnelle']) {
      console.log(`### Modules école professionnelle\n`)
      for (courses of competences['Modules école professionnelle']) {
        console.log(`   - ${courses.id} ${courses.descr}`)
      }
      console.log(`\n`)
    }
    if (competences['Modules cours interentreprises']) {
      console.log(`### Modules cours interentreprises\n`)
      for (cie of competences['Modules cours interentreprises']) {
        console.log(`   - ${cie.id} ${cie.descr}`)
      }
      console.log(`\n`)
    }
  }
}
