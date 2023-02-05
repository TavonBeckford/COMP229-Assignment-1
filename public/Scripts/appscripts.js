/*appscripts.js Michael Beckford 301305528  2023-02-01*/

(function (){
    function start(){
        console.log("app Started....");
    }
    window.addEventListener("load", start);
})();


function show() {
    $(".container").load("/about");
}

function homeshow() {
    $(".container").load("/");
}