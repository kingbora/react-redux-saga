/**
 * Created by wenbo.kuang on 2018/6/25.
 */
import io from 'socket.io-client';

export default class SocketClient {
    //建立连接
    connect(path) {
        this.socket = io.connect(path);
        return new Promise((resolve, reject) => {
            this.socket.on("connect", () => resolve());
            this.socket.on("connect_error", (err) => reject(err));
        });
    }
    //断开连接
    disconnect() {
        return new Promise((resolve) => {
            this.socket.disconnect(() => {
                this.socket = null;
                resolve();
            });
        })
    }

    //给服务端发送消息
    emit(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket)
                return reject("No socket connected.");

            return this.socket.emit(event, data, (res) => {
                if (res.error) {
                    return reject(res.err);
                }

                return resolve();
            });
        });
    }

    //监听服务端推送的消息
    on(event, fn) {
        return new Promise((resolve, reject) => {
            if (!this.socket)
                return reject("No socket connected");

            this.socket.on(event, fn);
            resolve();
        });
    }
}