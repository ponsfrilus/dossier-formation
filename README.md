![](./media/img/dossier-formation.png)
# Dossier formation d'informaticien·ne CFC (88611)

Le dossier de formation a pour but de se conformer à l'article 12
de l'[Ordonnance du SEFRI sur la formation professionnelle initiale
d'informaticienne / informaticien avec certificat fédéral de capacité (CFC)].

> Pendant la formation à la pratique professionnelle, la personne en formation
tient un dossier de formation dans lequel elle inscrit au fur et à mesure les
travaux importants concernant les compétences opérationnelles à acquérir.

L'Institut fédéral des hautes études en formation professionnelle IFFP
a élaboré des standards pour un dossier de formation de qualité dans la
formation professionnelle initiale. Ce document est téléchargeable sur le site
[formationprof.ch](formationprof.ch/dyn/18579.aspx). Une copie est disponible
[ici](./media/pdf/18579-19380-1-20120917_ehb-standards_ld-f.pdf).


## À propos

Le but de ce dépôt est de proposer un moyen simple et convival aux apprenti·e·s
informaticien·ne·s de créer leur dossier de formation, basé sur le plan de
formation.

Il a pour objectif de proposer :
* une version web interactive ;
* une version PDF, qui pourra être remplie après impression, soit en clonant ce
  dépôt.


### Besoins pour l'applucation web interactive

* L'apprenti·e doit pouvoir
  * contrôler ses objectifs évaluateurs entreprise, avec des cases "Expliqué", "Exercé" et "Autonomie" ;
  * commenter ses objectifs évaluateurs entreprise avec un champ libre permettant de donner un exemple d'activité / projet qui complète et/ou explique en quoi il est acquis ;
  * indiquer une date, une note et un commentaire (champ libre) pour les modules cours interentreprises ;
  * indiquer une date, une note et un commentaire (champ libre) pour les modules école professionnelle.

En addition, l'interface doit proposer un export des données (permettant de
stocker l'état à un temps T) et un import des données (permettant de continuer
l'édition de données qui avaient été exportées). L'interface propose une
possibilité d'imprimer le dossier de formation, dans un format lisible et
compact, permettant d'avoir une vue d'ensemble.


## Liens utiles

* Page décrivant l'apprentissage d'informaticien·ne CFC :
  https://www.ict-berufsbildung.ch/formation-initiale/apprentissages-ict/informaticienne-cfc
* Ordonnance du SEFRI sur la formation professionnelle initiale
  d'informaticien·ne avec certificat fédéral de capacité (CFC) :
  https://www.fedlex.admin.ch/eli/oc/2020/941/fr
* Plan de formation relatif à l’ordonnance du SEFRI du 19 novembre
  2020 sur la formation professionnelle initiale d'informaticien·ne
  avec certificat fédéral de capacité (CFC) du 19 novembre 2020 :
  https://www.ict-berufsbildung.ch/resources/Bildungsplan_Informatik-EFZ_BiVo-2021_FR1.pdf
* Flyer décrivant la profession d'informaticien·ne : 
  https://www.ict-berufsbildung.ch/resources/Flyer_Informatik-fuer-Betriebe_FR.pdf
* Standards IFFP pour un dossier de formation : 
  https://formationprof.ch/dyn/bin/18579-19380-1-20120917_ehb-standards_ld-f.pdf


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
[plan de formation]: ./media/pdf/Bildungsplan_Informatik-EFZ_BiVo-2021_FR1.pdf
[data.json]: ./data.json
