# 3. Firebase functions

- Make sure you have the `firebase-tools` installed: `npm install -g firebase-tools`
- Navigate to `firebase-functions` and type `firebase init` and authenticate against your account
- `firebase init` and choose `Functions: Configure and deploy Cloud Functions`
- Select the `buyxiny` project
- Follow the necessary instructions
- Set an env variable to point to your netlify build hook: `firebase functions:config:set netlify.buildhook="https://api.netlify.com/build_hooks/<id>"` and confirm it's set by typing: `firebase functions:config:get`
- Run `firebase deploy`
