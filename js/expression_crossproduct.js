function Crossproduct(input1, input2) {
    this.input1 = input1;
    this.input2 = input2;

    this.setChildren([this.input1, this.input2]);

    this.checkValidity = function() {
        if (this.input1.getName() == this.input2.getName()) {
            throw "Beim Kreuzprodukt müssen die Relationen verschieden heißen!";
        }
    }

    this.getName = function() {
        this.checkValidity();
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        this.checkValidity();

        var cols1 = this.input1.getColumns();
        var cols2 = this.input2.getColumns();
        var name1 = this.input1.getName();
        var name2 = this.input2.getName();
        var newcols = [];
        cols1.each(function(c) {
            newcols.push(name1 + "." + c);
        });
        cols2.each(function(c) {
            newcols.push(name2 + "." + c);
        });

        return newcols;
    }
    this.setColumns = null;

    this.getResult = function() {
        this.checkValidity();
        
        var rel1 = this.input1.getResult();
        var cols1 = this.input1.getColumns();
        var rel2 = this.input2.getResult();
        var cols2 = this.input2.getColumns();
        var result = [];
        
        if (rel1.length * rel2.length > 2000) {
            throw "Das Kreuzprodukt ist zu groß, dein Browser würde abstürzen.";
        }

        // assemble result
        rel1.each(function(row) {
            rel2.each(function(row2) {
                result.push(row.concat(row2));
            });
        });

        return result;
    }

    this.copy = function() {
        return new Crossproduct(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\times") + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\times " + this.input2.toLatex() + ")";
    }
}
Crossproduct.prototype = new Relation;