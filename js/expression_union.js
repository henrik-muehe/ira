function Union(input1, input2) {
    this.setChildren([input1, input2]);

    this.input1 = input1;
    this.input2 = input2;

    this.validate = function() {
        if (this.input1.getColumns() == null || this.input2.getColumns() == null) {
            throw "Es fehlt mindestens eine Eingaberelation der Vereinigung.";
        }

        if (this.input1.getColumns().length != this.input2.getColumns().length) {
            throw "Die Spaltenzahl und Namen der zwei Eingaberelationen müssen für die Vereinigung gleich sein!";
        }

        cols2 = this.input2.getColumns();
        this.input1.getColumns().each(function(c, nr) {
            if (c != cols2[nr]) {
                throw "Die Spaltenzahl und Namen der zwei Eingaberelationen müssen für die Vereinigung gleich sein!";
            }
        });
    }

    this.getName = function() {
        this.validate();
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        this.validate();
        return this.input1.getColumns();
    }
    this.setColumns = null;

    this.getResult = function() {
        this.validate();
        var rel1 = this.input1.getResult()
        var rel2 = this.input2.getResult()
        var col1 = this.input1.getColumns();
        var result = rel1.clone();

        rel2.each(function(row2) {
            var dont_add = false;
            rel1.each(function(row1) {
                var fields_differ = false;
                row1.each(function(c, nr) {
                    if (c != row2[nr]) {
                        fields_differ = true;
                    }
                });

                if (!fields_differ) {
                    dont_add = true;
                }
            });

            if (!dont_add) {
                result.push(row2);
            }
        });

        return result;
    }

    this.copy = function() {
        return new Union(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\cup") + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\cup " + this.input2.toLatex() + ")";
    }
}
Union.prototype = new Relation();