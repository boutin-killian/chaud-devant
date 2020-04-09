Pour faire fonctionner le projet :

Installer ngrok sur l'ordinateur
Installer Expo sur téléphone

- npm install
- cd server && node app.js

Ouvrir une cmd et faire "ngrok http 3000". Copier le lien "https" créé 
et le coller dans MapScreen.js et dans ParamsScreen.js dans la variable "SocketEndpoint"

- expo start --tunnel

Une fenêtre navigateur s'ouvre avec expo ; 
en bas à gauche, si le lien est : "exp://192.168.X.X", 
et que le bouton est sur tunnel, le tunnel ne s'est pas créé, 
refaire "expo start --tunnel".

Une fois le tunnel créé en bas à gauche,
un lien de type :  exp://fq-n52.killianboutin.chauddevantproject.exp.direct:80
scanner le QR code avec le téléphone et attendre qu'il build.
Cliquer sur "Run in web browser" et attendre que l'onglet s'ouvre.

Aller dans carte avec son téléphone.

Aller dans Paramétrage avec son navigateur.

Quand on change les paramètres sur l'ordinateur, les filtres changent sur l'application.
