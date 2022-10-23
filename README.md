# Reactive Objects For JavaScript (RoJS)

## Simple observable pattern in typescript

[![npm package](https://img.shields.io/badge/npm%20i-example--typescript--package-brightgreen)](https://www.npmjs.com/package/@reactive/rojs) [![version number](https://img.shields.io/npm/v/@reactive/rojs?color=green&label=version)](https://github.com/machester4/RoJS/releases) [![Actions Status](https://github.com/machester4/RoJS/workflows/Test/badge.svg)](https://github.com/machester4/RoJS/actions) [![License](https://img.shields.io/github/license/machester4/RoJS)](https://github.com/machester4/RoJS/blob/main/LICENSE)

### sample code

```typescript
import { Observable } from '@machester4/rojs'

class ChatModelObservable extends Observable {
  private messages: string[] = []

  constructor() {
    super()
  }

  sendMessage(userID: number, message: string) {
    this.messages.push(message)
    this._next({ userID, message })
  }
}

type ChatMessageDto = {
  userID: number
  message: string
}

const testObservable = new ChatModelObservable()
const subscriptionA = testObservable.subscribe<ChatMessageDto>((message) =>
  console.log('message received subscription A: ', message)
)
const subscriptionB = testObservable.subscribe<ChatMessageDto>((message) =>
  console.log('message received subscription B: ', message)
)

testObservable.sendMessage(1, 'Hello')

subscriptionA.unsubscribe()

testObservable.sendMessage(2, 'World')
```
