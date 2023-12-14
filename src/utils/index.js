export function copyToClipboard(element) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    setTimeout(() => {
        window.getSelection().removeAllRanges();// to deselect
    }, 100);
}