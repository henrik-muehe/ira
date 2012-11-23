function Selection(condition, input) {
    this.setChildren([condition, input]);

    this.condition = condition;
    this.input = input;

    this.getName = function() {
        return this.input.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        return this.input.getColumns();
    }
    this.setColumns = null;

    this.getResult = function() {
        var rel = this.input.getResult();
        var cols = this.input.getColumns();
        var cond = this.condition.toJS();
        if (cond == null) cond = true;
        var result = [];
        var relname = this.input.getName();

        rel.each(function(row) {
            var currentRow = new Object();
            cols.each(function(name, nr) {
                eval("currentRow." + name.gsub(".", "___") + " = " + row[nr].toJSON() + ";");
                //eval("currentRow." + (relname + "." + name).gsub(".", "___") + " = " + row[nr].toJSON() + ";");
            });
            if (eval(cond)) {
                result.push(row);
            }
        });

        return result;
    }

    this.copy = function() {
        return new Selection(this.condition.copy(), this.input.copy());
    }

    this.toHTML = function() {
        var display = '(' + latex("\\sigma");
        display += '<span style=\'font-size:10pt; vertical-align: bottom\'>' + this.condition.toHTML() + "</span> " + this.input.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(\\sigma_{" + this.condition.toLatex() + "}" + this.input.toLatex() + ")";
    }
}
Selection.prototype = new Relation();