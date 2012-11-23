function ValueLiteral(lit) {
    this.literal = lit;

    this.copy = function() {
        return new ValueLiteral(lit);
    }

    this.toJS = function() {
        return "\"" + this.literal + "\"";
    }

    this.toHTML = function() {
        return "'" + this.literal + "'";
    }

    this.toLatex = function() {
        return "'\\textrm{" + this.literal + "}'";
    }
}
ValueLiteral.prototype = new Value;