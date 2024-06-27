# 1. Installation des dépendances
Avant tout, vous devez avoir Node.js et npm installés sur votre machine. Pour vérifier si vous les avez déjà installés, exécutez les commandes suivantes dans votre terminal :
```bash
node -v
npm -v
```

Dans un terminal, positionnez-vous dans le répertoire du projet et exécutez la commande suivante pour installer les dépendances :
```bash
npm install
```

# 2. Création de la base de données
Pour créer la base de données, vous devez tout d'abord créer un compte Neo4j à l'adresse suivante : [Neo4j](https://login.neo4j.com/u/signup/identifier?state=hKFo2SBZUFlwUmxZbDJJVDAza3dCVzc4eFlsQXB1MFgzV3hVRaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEg3eFBDSUhmX2xqTGJNM05QdEwzZFF0RHFfYjFIcjBho2NpZNkgV1NMczYwNDdrT2pwVVNXODNnRFo0SnlZaElrNXpZVG8). Le site vous demandera de vérifier votre adresse e-mail. 

Ensuite, en étant connecté à votre compte, créer une nouvelle instance gratuite (une version payante n'est pas nécessaire pour ce projet). Télécharger les informations d'accès que le site vous donne.

# Mise en place des variables d'environnement
Copiez et collez le fichier `.env.example` et renommez-le en `.env`.

Dans le fichier `.env`, remplacez comme suit les valeurs entre chevrons par les informations que vous avez téléchargées lors de la création de la base de données :
```bash
EXPO_PUBLIC_NEO4J_URI="<NEO4J_URI>"
EXPO_PUBLIC_NEO4J_DATABASE="neo4j"
EXPO_PUBLIC_NEO4J_USER="<NEO4J_USERNAME>"
EXPO_PUBLIC_NEO4J_PASSWORD="<NEO4J_PASSWORD>"
```

Si vous désirez que l'application scanne les QR codes automatiquement, vous pouvez ajouter la variable d'environnement suivante dans le fichier `.env` :
```bash
EXPO_PUBLIC_AUTOMATIC_SCAN=true
```

# 3. Création des QR codes
Pour créer les QR codes, vous devez exécuter le script `generate-qrcodes.ts` qui se trouve dans le répertoire du projet. Pour cela, exécutez la commande suivante dans le terminal :
```bash
node generate-qrcodes.ts <NUMBER_OF_QR_CODES>
```

Les QR codes seront générés dans le répertoire `qr-codes`. Vous pouvez les imprimer et les placer dans le bâtiment.

# 4. Lancement de l'application
## 4.1. Mode développement
Avant de build l'application, vous pouvez lancer l'application en mode développement pour vérifier son bon fonctionnement. Pour cela, vous devez installer Expo Go sur votre téléphone.

Dans le terminal, exécutez la commande suivante :
```bash
npx expo start
```

Un QR code s'affichera dans le terminal. Scannez-le avec Expo Go pour lancer l'application sur votre téléphone.

## 4.2. Mode tunnel
Si l'application ne se lance pas, vous pouvez essayer de lancer l'application en mode tunnel. Pour cela, vous devez installer ngrok. Pour cela, exécutez la commande suivante dans le terminal :
```bash
npm install -g ngrok
```

Ensuite, exécutez la commande suivante pour lancer l'application en mode tunnel :
```bash
npx expo start --tunnel
```

Un QR code s'affichera dans le terminal. Scannez-le avec Expo Go pour lancer l'application sur votre téléphone.

# 5. Build de l'application
Pour build l'application, vous devez d'abord installer eas-cli. Pour cela, exécutez la commande suivante dans le terminal :
```bash
npm install -g eas-cli
```

Vous devez ensuite vous connecter à votre compte Expo. Si vous n'avez pas de compte, vous pouvez en créer un à l'adresse suivante : [Expo](https://expo.dev/signup). Ensuite, exécutez la commande suivante pour vous connecter à votre compte Expo :
```bash
eas login
```

Ensuite, exécutez la commande suivante pour build l'application :
```bash
eas build --platform android --profile preview
```

L'application sera build. Vous pouvez suivre sa progression sur le site d'Expo. Vous pourrez ensuite télécharger l'APK de l'application sur le site d'Expo.

# 6. Déploiement de l'application
Pour déployer l'application, connectez un téléphone Android à votre ordinateur. Vous pouvez vérifier que votre téléphone est bien connecté en exécutant la commande suivante :
```bash
adb devices
```

Ensuite, exécutez la commande suivante pour déployer l'application sur votre téléphone :
```bash
adb install <APK_PATH>
```

L'application sera installée sur votre téléphone. Vous pourrez ensuite l'ouvrir et l'utiliser.

# 7. Gestion de la base de données
Sur le site de Neo4j, vous pouvez gérer votre base de données en vous connectant à l'instance que vous avez créée.

Voici quelques requêtes que vous pouvez exécuter pour gérer la base de données :
```bash
# Afficher le contenu de la base de données
MATCH p=()-[CONNECTED_TO]->() RETURN p;

# Supprimer toute la base de données
MATCH (p) DETACH DELETE p;
```
