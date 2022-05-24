# Reactive Objects For JavaScript (RoJS)

## Simple observable pattern in typescript

### sample code

```typescript
import { Observable } from './';

class ChatModelObservable extends Observable {
  private messages: string[] = [];

  constructor() {
    super();
  }

  sendMessage(userID: number, message: string) {
    this.messages.push(message);
    this._next({ userID, message });
  }
}

type ChatMessageDto = {
  userID: number;
  message: string;
};

const testObservable = new ChatModelObservable();
const subscriptionA = testObservable.subscribe<ChatMessageDto>((message) =>
  console.log('message received subscription A: ', message)
);
const subscriptionB = testObservable.subscribe<ChatMessageDto>((message) =>
  console.log('message received subscription B: ', message)
);

testObservable.sendMessage(1, 'Hello');

subscriptionA.unsubscribe();

testObservable.sendMessage(2, 'World');
```
