export default function getOffset(x, string, font=11) {
    
    var text = string.length / 2

    var offset = x + (text * font) + 6

    return offset

}