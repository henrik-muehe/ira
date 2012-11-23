function RightOuterJoin(input1, input2) {
    var symbol = "\\hspace{1ex}{\\mathrel{\\mathord{\\bowtie}\\hspace{-0.1ex}{\\mathrel{\\stackrel{\\rule[0.52ex]{0.50ex}{0.10ex}}{\\rule[0ex]{0.50ex}{0.10ex}}\\hspace{-0.7ex}}\\hspace{1ex} ";
    this.setChildren([input1, input2]);

    this.base = Join;
    this.base(input1, input2);

    this.leftOuter = false;
    this.rightOuter = true;

    this.copy = function() {
        return new RightOuterJoin(this.input1.copy(), this.input2.copy());
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
RightOuterJoin.prototype = new Join;
