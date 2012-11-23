function ConditionComparison(op, value1, value2) {
    this.value1 = value1;
    this.value2 = value2;
    this.op = op;

    this.setChildren([this.value1, this.value2]);

    this.copy = function() {
        return new ConditionComparison(op, this.value1.copy(), this.value2.copy());
    }

    this.toJS = function() {
        if (this.value1.toJS() == null || this.value2.toJS() == null) return null;
        if (this.op == "=") {
            this.op = "==";
        }
        return this.value1.toJS() + " " + this.op + " " + this.value2.toJS();
    }

    this.opToLatex = function(o) {
        switch (o) {
        case '==':
            return '=';
        case '!=':
            return '\\neq';
        case '<=':
            return '\\leq';
        case '>=':
            return '\\geq';
        default:
            return this.op;
        }
    }

    this.toHTML = function() {
        var display = '';
        display += this.value1.toHTML() + latex(this.opToLatex(this.op)) + this.value2.toHTML() + '';
        return display;
    }

    this.toLatex = function() {
        return this.value1.toLatex() + this.opToLatex(this.op) + ' ' + this.value2.toLatex();
    }
}
ConditionComparison.prototype = new Condition;