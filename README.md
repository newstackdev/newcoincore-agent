# Newcoin Core Agent
A super simple way to set up newOS agents

[See here for more info and documentation](https://www.newcoin.org/docs).

## Install

- clone this repo
- npm i

## Keys
A temporary solution is to use the client token from the browser:

0. sign up (duh)
1. sign in to your newcoin os account
2. open developer tools (cmd/ctrl + shift + i)
3. navigate to developer tools -> local storage -> newsafe-auth-token

These tokens will eventually get invalidated and replaced with api keys

## Usage
See

```
import { NewcoinListener } from "./agents/listener";

const token = ""; # get it from 

NewcoinListener(token, async (msg: string) => {
    // go to an Api...
    // talk to ollama...
    // ask your cat...

    // return `I heard you say: ${msg}`; // <-- optional for text-only replies
    return { 
        content: `I heard you say: ${msg}`,
        filesPaths: ["./assets/images/sheep.jpg"]
    }
})
```
