function ConditionNot(cond) {
    this.cond = cond;

    this.setChildren([cond]);

    this.copy = function() {
        return new ConditionNot(this.cond.copy());
    }

    this.toJS = function() {
        if (this.cond.toJS() == null) return null;
        return "!(" + this.cond.toJS() + ")";
    }

    this.toHTML = function() {
        var display = '(';
        display += latex("\\neg") + this.cond.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return '\\neg ' + this.cond.toLatex();
    }
}
ConditionNot.prototype = new Condition;