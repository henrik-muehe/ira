function ConditionalJoin(condition, input1, input2) {
    this.input1 = input1;
    this.input2 = input2;
    this.condition = condition;

    this.setChildren([this.condition, this.input1, this.input2]);


    this.getName = function() {
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        var columns = this.input1.getColumns().clone();
        var name2 = this.input2.getName();
        this.input2.getColumns().each(function(c) {
            if (columns.indexOf(c) < 0) {
                columns.push(c)
            } else {
                columns.push(name2 + "." + c)
            }
        });
        return columns;
    }
    this.setColumns = null;
    
    this.getResult = function() {
        var cols = this.getColumns();
        var cond = this.condition.toJS();
        if (cond == null) cond = true;
        var result = [];

        var cp = new Crossproduct(this.input1, this.input2)
        var cross = cp.getResult();

        cross.each(function(row) {
            var currentRow = new Object();
            cols.each(function(name, nr) {
                eval("currentRow." + name.gsub(".", "___") + " = " + row[nr].toJSON() + ";");
                eval("currentRow." + cp.getColumns()[nr].gsub(".", "___") + " = " + row[nr].toJSON() + ";");
            });
            if (eval(cond)) {
                result.push(row);
            }
        });

        return result;
    }

    this.copy = function() {
        return new ConditionalJoin(this.condition.copy(), this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\bowtie") + "<span style='font-size:10pt; vertical-align: bottom'>" + this.condition.toHTML() + "</span> " + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\bowtie_{" + this.condition.toLatex() + "} " + this.input2.toLatex() + ")";
    }
}
ConditionalJoin.prototype = new Relation;