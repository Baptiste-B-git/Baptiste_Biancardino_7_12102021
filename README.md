# Groupomania - Réseau social d'entreprise

- Stack technique utilisées :  
JavaScript, HTML, CSS, VueJS, MySQL, sequelize, nodeJs, express, axios, joi, multer, bcrypt  

- Importer la database :   
Noter dans le terminal : mysql -u root -p database_development < database_development.sql  

- Installation du Projet :  
backend :  
cd Baptiste_Biancardino_7_12102021>backend  
npm install  
npm start  

frontend :  
cd Baptiste_Biancardino_7_12102021>frontend  
npm install  
npm run serve  

- Compte administrateur :  
Pour se connecter en tant qu'admin, sur la page login entrez les informations suivantes :  
e-mail : admin@gmail.com  
mdp : admin7812  

Donner à un utilisateur l'autorisation d'être admin :  
Utilisation de Workbench  
Se rendre sur la table users  
Choisir l'utilisateur et dans la colonne isAdmin noter 1 à la place de null. Noter 0 pour lui enlever l'accès.