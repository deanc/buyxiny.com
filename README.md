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

  	function isPublic() {
    	return resource.data.active == 1;
    }

  	function isLoggedIn() {
    	return request.auth.uid != null;
    }

  	function isAuthor() {
      return request.auth.uid == request.resource.data.author;
    }

    function isAdmin() {
    	return request.auth.uid != null && 'admin' in request.auth.token.roles;
    }

    function isModerator() {
    	return request.auth.uid != null && 'moderator' in request.auth.token.roles;
    }

    function hasRole() {
    	return isAdmin() || isModerator();
    }

    match /countries/{country} {
      allow read;
      allow write,update,delete: if isAdmin();
    }

    match /locations/{location} {
      allow read;
      allow create: if isLoggedIn();
      allow update: if isAuthor() || hasRole();
      allow delete: if hasRole();
    }

    match /items/{item} {
      allow read;
      allow create: if isLoggedIn();
      allow update: if isAuthor() || hasRole();
      allow delete: if hasRole();
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
