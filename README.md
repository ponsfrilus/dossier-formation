# Dossier formation d'informaticien·ne CFC (88611)

Le dossier de formation a pour but de se conformer à l'article 12
de l'[Ordonnance du SEFRI sur la formation professionnelle initiale
d'informaticienne / informaticien avec certificat fédéral de capacité (CFC)].

> Pendant la formation à la pratique professionnelle, la personne en formation
tient un dossier de formation dans lequel elle inscrit au fur et à mesure les
travaux importants concernant les compétences opérationnelles à acquérir.
>
> Au moins une fois par semestre, le formateur contrôle et signe le dossier de
formation et en discute avec la personne en formation.


## À propos

Le but de ce dépôt est de proposer un moyen simple et convival aux apprenti·e·s
informaticien·ne·s de créer leur dossier de formation, basé sur le plan de
formation.


## Liens utiles

* Page décrivant l'apprentissage d'infornaticien·ne CFC :
  https://www.ict-berufsbildung.ch/formation-initiale/apprentissages-ict/informaticienne-cfc
* Ordonnance du SEFRI sur la formation professionnelle initiale
  d'informaticienne / informaticien avec certificat fédéral de capacité (CFC) :
  https://www.fedlex.admin.ch/eli/oc/2020/941/fr
* Plan de formation relatif à l’ordonnance du SEFRI du 19 novembre
  2020 sur la formation professionnelle initiale d'informaticien·ne
  avec certificat fédéral de capacité (CFC) du 19 novembre 2020 :
  https://www.ict-berufsbildung.ch/resources/Bildungsplan_Informatik-EFZ_BiVo-2021_FR1.pdf
* Flyer décrivant la profession d'infornaticien·ne : 
  https://www.ict-berufsbildung.ch/resources/Flyer_Informatik-fuer-Betriebe_FR.pdf


## Structure

Les informations du [plan de formation] sont reportées dans le fichier
[data.json]. La structure est établie de la manière suivante :
   - Le premier niveau contient les domaines de compétences opérationnelles
   - Il contient une liste de compétences opérationnelles (`competences`)
   - Chaque compétence peut contenir une liste de :
      - Objectifs évaluateurs entreprise
      - Modules école professionnelle
      - Modules cours interentreprises

```
[
  {
    "id": "",
    "title": "",
    "subject": "",
    "competences": [
      {
        "id": "",
        "title": "",
        "subject": "",
        "description": "",
        "Objectifs évaluateurs entreprise": [
          {
            "id": "",
            "descr": "",
            "bloom": ""
          }
        ],
        "Modules école professionnelle": [
          {
            "id": "",
            "descr": ""
          }
        ],
        "Modules cours interentreprises": [
          {
            "id": "",
            "descr": ""
          }
        ]
      }
    ]
  }
]
```

[Ordonnance du SEFRI sur la formation professionnelle initiale d'informaticienne / informaticien avec certificat fédéral de capacité (CFC)]: https://www.fedlex.admin.ch/eli/oc/2020/941/fr
[plan de formation]: ./Bildungsplan_Informatik-EFZ_BiVo-2021_FR1.pdf
[data.json]: ./data.json
