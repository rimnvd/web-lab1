let x;
let y;
let r;
function checkX() {
    let xField = $('#x-text');
    let xVal = xField.val().replace(',', '.');
    if (xVal === "") {
        showMessage("Значение X не введено")
        return false;
    } else if (xVal.match(/^[+-]0$/) || xVal.match(/^[+-]0\.0+$/) || xVal.match(/^[+-]?0+$/) ||
        !xVal.match(/^-?[0-9]+\.[0-9]+$/) && !xVal.match(/^-?[0-9]+$/)) {
        showMessage("Значение X должно быть числом");
        return false;
    }
    if (xVal <= -5 || xVal >= 5) {
        showMessage("Значение X не входит в интервал (-5,5)");
        return false;
    }
    x = xVal;
    return true;
}

function checkY() {
    let checkY = false;
    $('input[type=checkbox]').each(function () {
        if ($(this).prop('checked')) {
            checkY = true;
        }
    });
    if (!checkY) {
        showMessage("Значение Y не выбрано");
        return false;
    }
    y = $('#y :checked').val();
    return true;
}

function checkR() {
    let isValid = false;
    $('.active').each(function () {
        isValid = true;

    });
    if (!isValid) {
        showMessage("Значение R не выбрано");
        return false;
    }
    r = document.getElementsByClassName("active")[0].value;
    return true;
}

function checkForm() {
    let xValid = checkX();
    let yValid = checkY();
    let rValid = checkR();
    return xValid && yValid && rValid;
}

function showMessage(message) {
    let errorMessage = document.createElement("div");
    errorMessage.textContent = message;
    $('#errors').append(errorMessage);
}

function clearError() {
    $('#errors').empty();
}

$('#reset').click(function () {
    $('#errors').empty();
    $('#r :button').removeClass("active");
})

function clearTable() {
    let table = "<tr>\n" +
        "        <th>X</th>\n" +
        "        <th>Y</th>\n" +
        "        <th>R</th>\n" +
        "        <th>Текущее время</th>\n" +
        "        <th>Время работы скрипта</th>\n" +
        "        <th>Результат</th>\n" +
        "    </tr>"
    $('#result-table').html(table);
}

$('#main-form').on('submit', function (event) {
    event.preventDefault();
    clearError();
    if (checkForm()) {
        $.ajax({
            url: "main.php",
            type: 'POST',
            //dataType: 'json',
            data: "X=" + x +"&Y=" + y + "&R=" + r,
            success: function (jsonData) {
                let parseData = JSON.parse(jsonData);
                let row = '<tr>';
                row += '<td>' + parseData.x +'</td>';
                row += '<td>' + parseData.y +'</td>';
                row += '<td>' + parseData.r +'</td>';
                row += '<td>'+ parseData.current + '</td>';
                row += '<td>' + parseData.execution + '</td>';
                row += '<td>' + parseData.result +'</td>';
                row += '</tr>';
                $('#result-table').append(row);
            },
            error: function () {
                alert("Something went wrong. Please, reload the page and try again.");
            }
        });
    }
})


