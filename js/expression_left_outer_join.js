function LeftOuterJoin(input1, input2) {
    var symbol = "\\hspace{1ex}{\\mathrel{\\stackrel{\\rule[0.52ex]{0.50ex}{0.10ex}}{\\rule[0ex]{0.50ex}{0.10ex}}\\hspace{-0.75ex}\\mathord{\\bowtie}\\hspace{1ex} ";
    this.setChildren([input1, input2]);

    this.base = Join;
    this.base(input1, input2);

    this.leftOuter = true;
    this.rightOuter = false;

    this.copy = function() {
        return new LeftOuterJoin(this.getInput1().copy(), this.getInput1().copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.getInput1().toHTML() + " " + latex(symbol) + " " + this.getInput2().toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.getInput1().toLatex() + symbol + this.getInput2().toLatex() + ")";
    }
}
LeftOuterJoin.prototype = new Join;
