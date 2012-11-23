function Intersection(input1, input2) {
    this.input1 = input1;
    this.input2 = input2;

    this.setChildren([this.input1, this.input2]);

    // as per Kemper et. al page 93
    this.base = Minus;
    this.base(this.input1, new Minus(this.input1, this.input2))

    this.copy = function() {
        return new Intersection(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\cap") + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\cap " + this.input2.toLatex() + ")";
    }
}
Intersection.prototype = new Minus;