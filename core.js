$(function() {
    var data = [
        [
            ["Força", "Destreza", "Vigor"],
            ["Carisma", "Manipulação", "Aparência"],
            ["Percepção", "Inteligência", "Raciocínio"]
        ], [
            ["Prontidão", "Esportes", "Briga", "Esquiva", "Empatia", "Expressão", "Intidimidação", "Liderança", "Manha", "Lábia"],
            ["Empatia Animal", "Ofícios", "Condução", "Etiqueta", "Armas de Fogo", "Armas Brancas", "Performance", "Segurança", "Furtividade", "Sobrevivência"],
            ["Acadêmicos", "Computador", "Finanças", "Investigação", "Direito", "Linguística", "Medicina", "Ocultismo", "Política", "Ciência"]
        ]
    ];

    $("#attributes, #abilities").each(function(i) {
        $(this).children(".column").each(function(j) {
            var values = data[i][j];
            for (var k = 0; k < values.length; k++) {
                $(this).append('<div><span>' + values[k] + '</span>' + makeLevels(5, (i == 0 ? 1 : 0)) + '</div>');
            }
        });
    });

    $("#advantages .column:not(:last-of-type)").each(function() {
        for (var i = 0; i < 6; i++) {
            $(this).append('<div><span><input type="text"/></span>' + makeLevels(5) + '</div>');
        }
    });

    var virtues = ["Consciência/Convicção", "Auto-Controle/Instinto", "Coragem"];
    $.each(virtues, function(index) {
        $("#advantages .column:last-of-type").append('<div><span>' + virtues[index] + '</span>' + makeLevels(5, 1) + '</div>');
    })

    $(".level:not(.level-fixed)").on("click", function(event) {
        var siblings = $(event.target).parent().children(".level:not(.level-fixed)");
        var before = true;
        var selectedAmount = siblings.filter(".level-filled:not(.level-fixed)").length;
        for (var i = 0; i < siblings.length; i++) {
            if (before) {
                $(siblings.get(i)).addClass("level-filled");
            } else {
                $(siblings.get(i)).removeClass("level-filled");
            }

            if (siblings.get(i) === event.target) {
                if (i === 0 && selectedAmount === 1) {
                    $(event.target).removeClass("level-filled");
                }

                before = false;
            }
        }
    })

    var health = {
        "Escoriado": "",
        "Machucado": -1,
        "Ferido": -1,
        "Ferido gravemente": -2,
        "Espancado": -2,
        "Aleijado": -5,
        "Incapacitado": ""
    };

    $.each(health, function(k, v) {
        $("#health").append('<div><span>' + k + '</span><span>' + v + '</span><input type="checkbox"/></div>');
    });
});

function makeLevels(amount) {
    makeLevels(amount, 0);
}

function makeLevels(amount, filled) {
    var html = '<span class="levels">';
    for (var i = 0; i < amount; i++) {
        if (filled > 0) {
            html += '<div class="level level-filled level-fixed"></div>';
            filled--;
        } else {
            html += '<div class="level"></div>';
        }
    }
    html += '</span>';

    return html;
}

function encodeSheet() {
    var values = [];
    $("#character .column input[type='text']").each(function() {
        values.push($(this).val().trim() + ';');
    });

    $("#attributes .column .levels, #abilities .column .levels").each(function() {
        values.push($(this).children(".level-filled").length);
    });

    return values;
}
