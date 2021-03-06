# Hause Takehome

So the original email said "it was meant for react/node, but use whatever!"  Admittedly, I probably could have done this in a quarter of the the time as a pure server-side Rails app: devise for auth, and a simple model.  But I kinda wanted to experiment with some more frontend tools, so I decided to go node + react/redux, with typescript on the client side.  This was my first time setting up redux from scratch, and definitely my first time using redux with typescript (which probably sucked up at least half my overall time on this).  Also my first time setting up a node app with more than one endpoint.

Anyway, it all works.  Node/Express exposes a simple rest-ish api.  That's consumed on the frontend through redux using redux-thunk for async actions.  Data is stored in an sqlite db in the local filesystem (which, of course, means it'll get periodically blown way on hosting providers with ephemeral filesystems like heroku)

There's plenty I left by the wayside since this is a time-limited challenge:

- Validation (eg you can totally sign up with a blank username + password :) )
- Testing, at any layer
- Error handling, in most spots
- More file hierarchy.  The backend, for example, is only two files.  This works at this scale, but you pretty quickly want a reasonable file structure, eg the one generated by `express-generator`.
- Use a more fullsome auth tool than PassportJS, which really only gave me basic session management.
- A proper database (rather than just using a local sqlite file db)
- Session storage that persists through server restart
- Split out backend logic from the router functions
- Set up more consistent linting between frontend and backend- couldn't get eslint to work against typescript + react files, so I had to use the deprecated tslint for the frontend.
- Use migrations for db changes, rather than just sequelize's .sync().
- Use a CSS-preprocessor like SCSS
- Better UI (I kept it pretty darn minimal) and better UX (error messages, indicators when things are saving, etc)

Also, in retrospect, Redux was certainly overkill.  I could have just used a few plain old JS classes and passed react state around via props.  But that's a technique I've been overreliant on in my personal react projects, so it was a good learning experience to mess around with react.  Also, although I sunk a lot of time into fighting with typescript in redux, I get the feeling it'd be a big win in a larger codebase.  I kinda want to play around with it a bit more - I think type safety has the potential to make Redux a lot easier to use and understand.
