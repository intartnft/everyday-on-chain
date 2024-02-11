
export function wrapImageSource(source: string, width: number, height: number) {
    const maxSize = Math.max(width, height)
    let offsetX = 0
    let offsetY = 0
    if (width > height) {
        // offsetY = (width - height) * 0.5
    }else{
        // offsetX = (height - width) * 0.5
    }
    const lines = [
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" viewBox="0 0 ' + width + ' ' + height + '" x="0" y="0" width="' + maxSize + '" height="' + maxSize + '">',
        '<foreignObject x="' + offsetX + '" y="' + offsetY + '" width="' + width + '" height="' + height + '">',
        '<xhtml:img style="width:100%;height:100%" src="' + source + '"/>',
        '</foreignObject></svg>'
    ]
    return lines.join("")
}

export function wrapImageSourceAndEncode(source: string, width: number, height: number) {
    const wrapped = wrapImageSource(source, width, height)
    const base64 = Buffer.from(wrapped).toString('base64')
    return "data:image/svg+xml;base64," + base64
}