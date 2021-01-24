# Starting the backend

- `cd` into the `backend` folder
- run `npm i` to install the dependencies
- run `npm run build-ts` to compile
- run `npm run watch-node` to start the server

The server uses `express` and has 2 routes: `categories` and `items`, with the CRUD operations. It also has a hardcoded authentication in place.
The backend connects to a mongo database that is running on the cloud.

# Starting the frontend

The frontend uses Angular with NgRx for state management. 

- `cd` into the `frontend` folder
- run `npm i` to install the dependencies
- run `ng serve` to start

The app starts with the normal user view by default.

- To enable to the admin view, a combination of keys must be pressed in the order, which is:
"arrow up", "arrow down", "arrow left", "arrow right", "b" and "a". (see `EnableAdminService`.)

- There is an interceptor in place to add the header for the admin requests (see `TokenInterceptor`)

- There aren't many comments as I beleive most of the code is clear and self-explanatory.

- There are some units tests, use `ng test` to run them
