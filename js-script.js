class PubSub {
    constructor() {
        this.handlers = [];
    }
    subscribe(event, handler, context) {
        if (typeof context === 'undefined') { context = handler; }
        this.handlers.push({ event: event, handler: handler.bind(context) });
    }
    publish(event, args) {
        this.handlers.forEach((topic) => {
            if (topic.event === event) {
                topic.handler(args)
            }
        })
    }
}

class Rose {
    constructor() {
        this.pubsub = new PubSub();
        this.pubsub.subscribe('message to Rose', this.emitMessage, this);
    }
    emitMessage(msg) {
        console.group('PubSub');
        if (msg === 'Billy to Rose: I love you, Rose') {
            console.log(msg,'Rose to Jack: Im with Billy now');
        } else if (msg === 'Jack to Rose: I love you, Rose') {
            console.log(msg,'Rose to Billy: Im with Jack now');
        }
        console.groupEnd();
    }
    sendMessage(bear) {
        if (bear === billy) {
            bear.pubsub.publish('message from Rose', 'Rose to Billy: Im with Jack now');
        } else if (bear === jack) {
            bear.pubsub.publish('message from Rose', 'Rose to Jack: Im with Billy now');
        }
        
    }
};

class Billy {
    constructor() {
        this.pubsub = new PubSub();
        this.pubsub.subscribe('message from Rose', this.emitMessage, this);
    }
    emitMessage(msg) {
        console.group('PubSub');
        if (msg === 'Rose to Billy: I love you, Billy') {
            console.log(msg,'Billy to Rose: Yay, Im with Rose now');
        } else if (msg === 'Rose to Billy: Im with Jack now') {
            console.log(msg, 'Billy to Rose: Be happy, bears');
        }
        console.groupEnd();
    }
    sendMessage(bear) {
        
        bear.pubsub.publish('message to Rose', 'Billy to Rose: I love you, Rose');
    }
};

class Jack {
    constructor() {
        this.pubsub = new PubSub();
        this.pubsub.subscribe('message from Rose', this.emitMessage, this);
    }
    emitMessage(msg) {
        console.group('PubSub');
        if (msg === 'Rose to Jack: I love you, Jack.') {
            console.log(msg,'Jack to Rose: Yay, Im with Rose now');
        } else if (msg === 'Rose to Jack: Im with Billy now') {
            console.log(msg, 'Jack to Rose: Be happy, bears');
        }
        console.groupEnd();
    }
    sendMessage(bear) {
        bear.pubsub.publish('message to Rose', 'Jack to Rose: I love you, Rose');
    }
};

let rose = new Rose();
let billy = new Billy();
let jack = new Jack();

//Джек пишет Роуз
jack.sendMessage(rose)

// После собщения от Джека, Роуз пишет Билли
rose.sendMessage(billy)


