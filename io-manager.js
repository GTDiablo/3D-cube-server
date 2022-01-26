class IOManager {
    callbacks = [];


    onLocalChange(callback){
        this.callbacks.push(callback);
    }

    nodeChange(node){
        console.log(node);
    }

    publishLocalChange(change){
        this.callbacks.forEach((cb)=> cb(change));
    }
}

module.exports = IOManager;