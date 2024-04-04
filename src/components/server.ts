import {WebSocket, WebSocketServer} from 'ws';
import {ErrorHandler} from "./error";

export interface ServerContract {
    setMessageHandler(handler: any): void;

    start(): void;

    close(): void;
}

export class Server implements ServerContract {
    protected clients: Array<any> = []
    private readonly port: number;
    private wss: WebSocketServer | null = null;
    private messageHandler: any | null = null;

    constructor(port: number = 8088) {
        this.port = port
    }

    private getConnectionHandler(): any {
        return (ws: WebSocket): void => {
            console.log('New connection');

            ws.on('message', this.getMessageHandler(ws));

            this.clients.push(ws)
        }
    }

    private getDefaultMessageHandler(ws: WebSocket): (data: any) => void {
        return (data: any): void => {
            let message = JSON.parse(data);
            console.log('received: %s', data);
            ws.send(JSON.stringify({'message': 'Default answer', 'method': message.method}))
        };
    }

    private getMessageHandler(ws: WebSocket): (data: any) => void {
        return this.messageHandler
            ? this.messageHandler(ws)
            : this.getDefaultMessageHandler(ws);
    }

    public setMessageHandler(handler: any): void {
        this.messageHandler = (ws: WebSocket) => {
            return (data: any): void => {
                try {
                    ws.send(handler(data));
                } catch (error) {
                    ErrorHandler.resolveError(error, (message: string) => {
                        ws.send(message);
                    })
                }
            }
        };
    }

    public start(): void {
        this.wss = new WebSocketServer({
            port: this.port,
        });

        this.wss.on('connection', this.getConnectionHandler());
    }

    public close(): void {
        this.wss?.close(() => {
            console.log('Close connection');
        })
    }
}
