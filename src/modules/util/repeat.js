export default function repeat(callback, repetitions, ...args) {
    for (let i = 0; i < repetitions; i++) {
        callback(args);
    }
}
