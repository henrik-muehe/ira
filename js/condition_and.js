function ConditionAnd(cond1, cond2) {
    this.cond1 = cond1;
    this.cond2 = cond2;

    this.setChildren([cond1, cond2]);

    this.copy = function() {
        return new ConditionAnd(this.cond1.copy(), this.cond2.copy());
    }

    this.toJS = function() {
        if (this.cond1.toJS() == null || this.cond2.toJS() == null) return null;
        return this.cond1.toJS() + " && " + this.cond2.toJS();
    }

    this.toHTML = function() {
        var display = '(';
        display += this.cond1.toHTML() + latex('\\wedge') + this.cond2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return '(' + this.cond1.toLatex() + '\\wedge ' + this.cond2.toLatex() + ')';
    }
}
ConditionAnd.prototype = new Condition;