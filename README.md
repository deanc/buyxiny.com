# 2. Firestore collections

Create a project and add three collections:

- `items`
- `countries`
- `locations`

As firestore is schema-less I can't provide a schema, but will add required fields for documents in each
collection in due course.

You will need to set up firebase rules like so:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /countries/{country} {
      allow read;
      allow write: if false;
    }

    match /locations/{location} {
      allow read;
      allow write: if request.auth.uid != null;
    }

    match /items/{item} {
      allow read;
      allow write: if request.auth.uid == request.resource.data.author;
    }
  }
}
```

Add an index to the `items` collection across the following fields: `type Ascending name Ascending`

# 3. Firebase functions

- Make sure you have the `firebase-tools` installed: `npm install -g firebase-tools`
- Navigate to `firebase-functions` and type `firebase init` and authenticate against your account
- `firebase init` and choose `Functions: Configure and deploy Cloud Functions`
- Select the `buyxiny` project
- Follow the necessary instructions
- Set an env variable to point to your netlify build hook: `firebase functions:config:set netlify.buildhook="https://api.netlify.com/build_hooks/<id>"` and confirm it's set by typing: `firebase functions:config:get`
- Run `firebase deploy`
