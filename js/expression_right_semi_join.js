function RightSemiJoin(input1, input2) {
    this.input1 = input1;
    this.input2 = input2;

    this.setChildren([this.input1, this.input2]);

    this.getName = function() {
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        return this.input2.getColumns();
    }
    this.setColumns = null;

    this.getResult = function() {
        var r = new Projection(this.input2.getColumns().join(","), new Join(this.input1, this.input2));
        return r.getResult();
    }

    this.copy = function() {
        return new RightSemiJoin(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\rtimes") + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\rtimes " + this.input2.toLatex() + ")";
    }
}
RightSemiJoin.prototype = new Relation;