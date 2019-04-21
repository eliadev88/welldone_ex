

export function matrix(m, n) {
    var result = [];
    for(var i = 0; i < n; i++) {
        result.push(new Array(m).fill([]))
    }
    return result
}