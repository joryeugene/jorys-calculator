/* jshint ignore:start */
var input = document.getElementById('input'),
    numberBtns = document.querySelectorAll('.numbers div'),
    operatorBtns = document.querySelectorAll('.operators div'),
    equalsBtn = document.getElementById('equalsBtn'),
    clearBtn = document.getElementById('clearBtn'),
    results = document.getElementById('results'),
    displayResults = false;

// numbers
for (var i = 0; i < numberBtns.length; i++) {

    numberBtns[i].addEventListener("click", function (e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (displayResults === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (displayResults === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            displayResults = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            displayResults = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });

}

// operators
for (var i = 0; i < operatorBtns.length; i++) {

    operatorBtns[i].addEventListener("click", function (e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// equalsBtn
equalsBtn.addEventListener("click", function () {

    var inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    var expression = inputString + "=" + numbers[0].toString();

    persistExpression(expression);

    displayResults = true;
});

// clearBtn
clearBtn.addEventListener("click", function () {
    input.innerHTML = "";
});

function persistExpression(expression) {
    $.ajax({
        url: "/persist-expression",
        type: "get",
        data: {expression: expression},
        success: function (response) {
        },
        error: function (xhr) {
            console.log("Failed persistExpression");
        }
    });
}

function initWS() {
    var socket = new WebSocket("ws://localhost:9000/get-expressions"),
        container = $("#container");
    socket.onopen = function() {
        console.log("Socket open");
    };
    socket.onmessage = function (e) {
        var expressions = JSON.parse(e.data);

        results.innerHTML = "";

        $.each(expressions, function (i) {
            $('<li/>')
                .text(expressions[i])
                .appendTo(results);
        });
    };
    socket.onclose = function () {
        console.log("Socket closed");
    };
    return socket;
}

initWS();

/* jshint ignore:end */