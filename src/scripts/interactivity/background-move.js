/**
 * Move background based on mouse movement
 * @param {*} event Mouse event
 * @param {String} whichElement Which element to move
 * @param {Int | Float} howMuchMove How much to move the image by
 */
export function handleMoveBackground(event, whichElement, howMuchMove = 45) {
    if (document.getElementById(whichElement)) {
        if (document.getElementById(whichElement) && event?.pageX && event?.pageY) {
            /** New element height */
            let moveHeight = (howMuchMove / window.innerHeight) * (event.pageY - window.innerHeight);
            /** New element width */
            let moveWidth = (howMuchMove / window.innerWidth) * (event.pageX - window.innerWidth);
    
            document.getElementById(whichElement).style.backgroundPosition = `${moveWidth}px ${moveHeight}px`;
        };
    };
};