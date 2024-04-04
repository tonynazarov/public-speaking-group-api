import {Server, ServerContract} from "./src/components/server";
import {WpsgStrategy} from "./src/domain/wpsg/strategy";
import {Context} from "./src/components/context";


const context: Context = new Context(new WpsgStrategy())
const server: ServerContract = new Server()
server.setMessageHandler((data: any) => {
    return context.run(data)
})
server.start();



