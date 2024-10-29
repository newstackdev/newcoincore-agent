import { MoodReadResponse, PostReadResponse, UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { newgraphWebsocketsClientManager } from "../clients/wsclient";
import { NewcoinWriterAgent } from ".";

export type NewcoinAgentHandlerResponse = string | { content: string, filesPaths: string[] };
export type NewcoinAgentHandler = (msg: string, agent: ReturnType<typeof NewcoinWriterAgent>) => NewcoinAgentHandlerResponse | Promise<NewcoinAgentHandlerResponse>;

export const NewcoinListener = (token: string, listener?: NewcoinAgentHandler) => {
    const user: {
        current: UserReadPrivateResponse
    } = { current: {} }
    const writer = NewcoinWriterAgent(token); // if a tree fell in a wood and someone heard it but said nothing, did it even happen?

    const currentP = writer.current().then((u) => {
        user.current = u;
        return u;
    });

    const newgraphWebsocketsClient = newgraphWebsocketsClientManager((wsServer, token) => `${wsServer}?token=${encodeURIComponent(token)}`);;

    newgraphWebsocketsClient.toggle(token);
    const stats = {
        totalStringSize: 0,
        messagesCount: 0
    }

    newgraphWebsocketsClient.socket?.addEventListener("open", () => {
        currentP.then(() => {
            console.log(`Listening as ${user.current.username}`)
        });
    });

    newgraphWebsocketsClient.socket?.addEventListener("message",
        async (msg) => {
            const msgSize = msg.data.toString().length;
            stats.totalStringSize += msgSize;
            stats.messagesCount += 1;

            if (msg.data == "pong") { return Promise.resolve() };

            const data: { type: string, payload: { message: string, post: PostReadResponse, folder: MoodReadResponse } } = JSON.parse(msg.data.toString());

            // console.log("replying to: ", data.payload?.post?.content || "not replying")

            if (data.type == "newgraph" && data?.payload?.message == "post_in_folder") {
                const text = (data.payload?.post?.content || "").trim()

                if (!text.startsWith(`/${user.current.username}`)) //"/igorrubinovich.nco"))
                    return Promise.resolve();

                if (listener) {
                    const _r = listener(text.trim().replace(new RegExp(`/${user.current.username}`), ""), writer);
                    const r = _r instanceof Promise ? await _r : _r;

                    if (typeof r == "string") {
                        // await NewcoinWriter(agents[0]).postMessage(data.payload.folder.id!, "Hi, I'm a too basic bot. Cant tell you much but I can listen")
                        await writer.postMessage(data.payload.folder.id!, r);
                        console.log("replied to: ", data.payload.post.content, 'in folder', data.payload.folder.id!)
                    } else {
                        const filesPaths = r.filesPaths || [undefined];
                        for (let i = 0; i < filesPaths.length; i++) {
                            const fp = filesPaths[i];
                            console.log("Uploading file", fp);
                            await writer.postMessage(data.payload.folder.id!, i ? "" : r.content, fp);
                        }
                    }
                }

                // const p = await agents[0].api.post.postCreate({ content: "Hi, I'm a too basic bot. Cant tell you much but I can listen", contentType: "text/html" })
            }

        })
    return {
        get stats() {
            return stats;
        },
        wsclient: newgraphWebsocketsClient
    }
}
