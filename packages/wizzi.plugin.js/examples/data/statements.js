function alpha() {
    try {
        var a = 0;
    } catch (ex) {
        var x = 2;
        return 0;
    } finally {
        var x = 2;
        return 0;
    }
}

function beta() {
    try {
        var a = 0;
    } catch (ex) {
        return 0;
    } finally {
        return 0;
    }
}