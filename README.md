﻿# Logomotive API
Logomotive est un éditeur et un interpréteur de Logo disponible directement sur le Web. Les utilisateurs peuvent créer
des scripts de Logo et les partager aux autres utilisateurs de la plateforme.

---
_**[Eng]** Logomotive is a Logo editor and interpreter available directly on the Web. Users can create Logo scripts and
share them with other platform users._

## Installation
L'API de Logomotive nécessite :
- Node.js v20 ou supérieur
- PostgreSQL v16 ou supérieur

1. Installez les dépendances : Node.js et PostgreSQL.
2. Importez la base de données grâce au fichier `./logomotive-db-backup.sql`.
3. Depuis le répertoire racine de l'API, exécutez la commande `npm install`.
4. Vous pouvez désormais lancer l'API avec la commande `npm run dev`.

---
_**[Eng]** Logomotive needs:_
- _Node.js v20 or greater_
- _PostgreSQL v16 or greater_

1. _Install dependencies: Node.js and PostgreSQL._
2. _Import the database using the `./logomotive-db-backup.sql` file._
3. _From the API root directory, run the `npm install` command._
4. _You can now launch the API with the `npm run dev` command._

## Documentation
Une documentation Swagger est disponible à l'URI suivante : http://localhost:8080/docs.

---
_**[Eng]** Swagger documentation is available at the following URI: http://localhost:8080/docs._
