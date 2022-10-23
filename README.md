# Lightweight reactive extensions for modern JavaScript (rxjs-lite)

[![npm package](https://img.shields.io/badge/npm%20i-rxjs--nano-brightgreen)](https://www.npmjs.com/package/@reactive/rxjs-lite) [![version number](https://img.shields.io/npm/v/@reactive/rxjs-lite?color=green&label=version)](https://github.com/machester4/rxja-nano/releases) [![Actions Status](https://github.com/machester4/rxjs-lite/workflows/Test/badge.svg)](https://github.com/machester4/rxjs-lite/actions) [![License](https://img.shields.io/github/license/machester4/rxjs-lite)](https://github.com/machester4/rxjs-lite/blob/main/LICENSE)

### sample code

```typescript
import { Observable } from '@machester4/rxjs-lite'

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
