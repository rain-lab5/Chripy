***Project is not complete yet***
---------------------------------
***Current file structure : ***

```
Chripy-recovered
├──src
│   ├──app
│   │   ├──assets
│   │   │   └──logo.png
│   │   └──index.html
│   ├──authentication
│   │   ├──auth.test.ts
│   │   └──auth.ts
│   ├──db
│   │   ├──migrations
│   │   │   ├──meta
│   │   │   │   ├──_journal.json
│   │   │   │   ├──0000_snapshot.json
│   │   │   │   ├──0001_snapshot.json
│   │   │   │   └──0002_snapshot.json
│   │   │   ├──0000_spicy_magneto.sql
│   │   │   ├──0001_orange_silvermane.sql
│   │   │   ├──0002_harsh_wrecker.sql
│   │   │   └──0003_lively_zeus.sql
│   │   ├──queries
│   │   │   ├──chirps.ts
│   │   │   ├──refreshTokens.ts
│   │   │   └──users.ts
│   │   ├──index.ts
│   │   └──schema.ts
│   ├──errors
│   │   ├──BadRequestError.ts
│   │   ├──ForbiddenError.ts
│   │   ├──NotFoundError.ts
│   │   └──UnauthorizedError.ts
│   ├──handlers
│   │   ├──handleAddChirp.ts
│   │   ├──handleCreateUser.ts
│   │   ├──handleDeleteUsers.ts
│   │   ├──handleGetChirp.ts
│   │   ├──handleGetChirps.ts
│   │   ├──handleLogin.ts
│   │   ├──handleRefresh.ts
│   │   ├──handleResetHits.ts
│   │   ├──handleRevoke.ts
│   │   ├──handlerMetrics.ts
│   │   └──handlerValidateChripy.ts
│   ├──middleware
│   │   ├──errorHandler.ts
│   │   ├──logResponse.ts
│   │   └──metrics.ts
│   ├──config.ts
│   └──index.ts
├──drizzle.config.ts
├──package-lock.json
├──package.json
├──README.md
├──tsconfig.json
└──.gitignore
```

