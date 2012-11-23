// Create a namespace to hold variables and functions
mathtex = new Object();
// Change this to use your server
mathtex.imgSrc = "http://dbkemper4-vm10.informatik.tu-muenchen.de/~muehe/cgi-bin/mathtex.cgi?\\gammacorrection{.9}\\png\\dpi{110}";
// Transform the whole document: add src to each img with
// alt text starting with "mathtex:", unless img already has a src.
mathtex.init = function() {
    if (!document.getElementsByTagName) return;
    var objs = document.getElementsByTagName("img");
    var len = objs.length;
    for (i = 0; i < len; i++) {
        var img = objs[i];
        if (img.alt.substring(0, 8) == 'mathtex:')
        if (!img.src || img.src.match('null$')) {
            var tex_src = img.alt.substring(8);
            img.src = mathtex.imgSrc + encodeURIComponent(tex_src);
            // Append TEX to the class of the IMG.
            img.className += ' tex';
        }
    }
    mathtex.hideElementById("mathtex.error");
}
// Utility function
mathtex.hideElementById = function(id) {
    var obj = document.getElementById(id);
    if (obj) obj.style.display = 'none';
}
// resolve a cross-browser issue (see CBS events)
mathtex.addEvent = function(obj, evType, fn, useCapture) {
    if (obj.addEventListener) {
        //For Mozilla.
        obj.addEventListener(evType, fn, useCapture);
        return true;
    }
    else if (obj.attachEvent) {
        //For Internet Explorer.
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    }
}
// Initialize after entire document is loaded
mathtex.addEvent(window, 'load', mathtex.init, false);
