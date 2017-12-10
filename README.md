# API Route Description

## User details Routes
> * Routes pertaining to login and user information

| Method   | Route                | Description                              |
|----------|----------------------|------------------------------------------|
| **POST** | `/api/user/register` | Register a new user                      |
| **GET**  | `/api/user/username` | Check if a given username already exists |
| **POST** | `/api/user/login`    | Login a user with correct credentials    |
| **GET**  | `/api/user/profile`  | Get a user's profile details             |
| **POST** | `/api/user/profile`  | Set a user's profile details             |

## Code submission routes
> * Routes pertaining to user code

| Method   | Route            | Description                |
|----------|------------------|----------------------------|
| **POST** | `/api/code`      | Submit game code           |
| **GET**  | `/api/code`      | Get a user's game code     |
| **PUT**  | `/api/code/lock` | Lock a user's current code |

* The lock route freezes the current version of the code as the version that
  other players will challenge at that given time. If the code has not been
  previously been compiled, this route invokes the compile call for both player
  version libraries(dlls) and stores them. A user _cannot_ be challeneged, or
  challenge other players if they have not locked their code. If the player
  updates their source code and relocks it, the new code is recompiled into
  libraries.

* We only store one version of a player's code / libraries at a given time.
  Version control could be a stretch goal.

## Leaderboard routes
> * Routes pertaining to PvP challenges, player ratings, and the leaderboard

| Method   | Route              | Description                                                              |
|----------|--------------------|--------------------------------------------------------------------------|
| **GET**  | `/api/leaderboard` | Get the current list of players sorted by rating                         |
| **POST** | `/api/challenge`   | Start a challenge match between the current player and the chosen player |

## Match routes
> * Routes pertaining to a user's past and active matches

| Method  | Route               | Description                                                  |
|---------|---------------------|--------------------------------------------------------------|
| **GET** | `/api/match/all`    | Get a list of matches a user has played and their results    |
| **GET** | `/api/match`        | Get a specific match that the user has played (get log file) |
| **GET** | `/api/match/status` | Get the last active match status                             |

# Interface Design

We will require the following pages -

## Game Screen

```
+---------------------------------------------------------------+
|                               Nav                             |
+----------------------------------+----------------------------+
| +------------------------------+ | +------------------------+ |
| |                              | | |                        | |
| |                              | | |                        | |
| |                              | | |                        | |
| |                              | | |                        | |
| |                              | | |       Renderer         | |
| |                              | | |                        | |
| |                              | | |                        | |
| |         Code Editor          | | |                        | |
| |                              | | |                        | |
| |                              | | +------------------------+ |
| |                              | | +------------------------+ |
| |                              | | |                        | |
| |        +--------++---------+ | | |   Errors/Render Info   | |
| |        |Run Code||Lock Code| | | |                        | |
| |        +--------++---------+ | | |                        | |
| +------------------------------+ | +------------------------+ |
+----------------------------------+----------------------------+
```

* The code editor can be taken from existing libraries, like Monaco,
  CodeMirror, or ACE.

* The Run Code button compiles the code and executes it on the Renderer screen.

* The renderer itself will be an independent JS file that'll take file that the
  backend returns after successful compilation as input. 

* The Lock Code also compiles, but doesn't run. It instead enables the
  leaderboard features and lets the user challenge others and be challenged by
  others.

## Leaderboard

```
+---------------------------------------------------------------+
|                               Nav                             |
+---------------------------------------------------------------+
|                                                               |
|                                                               |
|                           Leaderboard                         |
|                                                               |
|                   +-----------------+------+                  |
|                   |     Username    | Rank |                  |
|Click to Challenge +------------------------+                  |
|          +        |                 |      |                  |
|          |        |                 |      |                  |
|          |        |                 |      |                  |
|          |        |                 |      |                  |
|          +------> |                 |      |                  |
|                   |                 |      |                  |
|                   |                 |      |                  |
|                   |                 |      |                  |
|                   |                 |      |                  |
|                   +------------------------+                  |
+---------------------------------------------------------------+
```

* This page is public, and is available before login as well. After login, and
  if the user has locked their code, they can initiate challenges from this
  page.

## Matches

```
+---------------------------------------------------------------+
|                               Nav                             |
+-------------------------------------+-------------------------+
|                                     | +---------------------+ |
|             Past Games              | |                     | |
|                                     | |                     | |
| +----------+-------------+--------+ | |                     | |
| | Opponent | Game Status | Result | | |      Renderer       | |
| |          |             |        | | |                     | |
| |          |             |        | | |                     | |
| |          |             |        | | |                     | |
| |          |             |        | | |                     | |
| |          |             |        | | +---------------------+ |
| |          |             |        | |                         |
| |          |             |        | |                         |
| |          |             |        | |                         |
| |          |             |        | |                         |
| |          |             |        | |                         |
| |          |             |        | |                         |
| +---------------------------------+ |                         |
+-------------------------------------+-------------------------+
```

* Displays a list of past matches that the player has played, along with any
  currently in execution

* The completed ones will have the result along with the game score, with the
  status Completed

* The one in execution will have a status like In Progress

* Clicking on a match fetches that match log file and renders it

## Offline Simulation

```
+---------------------------------------------------------------+
|                               Nav                             |
+-------------------------------------+-------------------------+
|                                     | +---------------------+ |
|                                     | |                     | |
|                                     | |                     | |
|     +------------------------+      | |                     | |
|     |      Upload File       |      | |      Renderer       | |
|     +------------------------+      | |                     | |
|                                     | |                     | |
|                                     | |                     | |
|                                     | |                     | |
|                                     | +---------------------+ |
|                                     |                         |
|                                     |                         |
|                                     |                         |
|                                     |                         |
|                                     |                         |
|                                     |                         |
|                                     |                         |
+-------------------------------------+-------------------------+
```

* User uploads a log file, call the renderer with it.

# Registration, Login, and Profile

* Pages for Registration for the event and Login. Registration should have a
  captcha and email verification.

# Game Rules and Tutorials

* Static content
