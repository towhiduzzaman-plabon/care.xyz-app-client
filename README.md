# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


> ⚠️ **Important:** make sure `VITE_API_BASE` is configured for production. The client will
> default to `http://localhost:3000` only in development; in production it will
> refuse to talk to localhost and will log an error instead. Use the provided
> `scripts/deploy-prod.ps1` helper with `-SetEnv` to push the correct value to
> Vercel, or manually add the variable in your hosting dashboard before
> building.


### Authentication notes

- The client uses Firebase for email/password and Google auth. When you log in or
  register the app also calls the backend to obtain a JWT token which is stored in
  `localStorage` under the key `access-token`.
- The registration form now requires *full name*, *NID number*, *contact number*
  in addition to email/password (the backend expects them). Failure to supply those
  fields will produce a 400 response.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
