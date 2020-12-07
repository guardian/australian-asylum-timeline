export default function getOffset(x, string, font=10) {
    
    var text = string.length / 2

    var offset = x + (text * font) + 20

    return offset

}