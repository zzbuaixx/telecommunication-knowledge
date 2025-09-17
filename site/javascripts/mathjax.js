/*
 * @Author: xx
 * @Date: 2025-09-16 16:33:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-09-16 16:33:31
 * @Description: 
 * @FilePath: \projectc:\Users\ZXJ\Desktop\learn\scrambler\scrambler\docs\javascripts\mathjax.js
 */
window.MathJax = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true,
    },
    options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex",
    },
};

document$.subscribe(() => {
    MathJax.typesetPromise();
});