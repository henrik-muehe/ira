function Value() {
    this.kind = Value;

    this.copy = function() {
        return new Value();
    }

    this.toJS = function() {
        return null;
        //throw "Der Ausdruck ist nicht vollständig definiert, es fehlt ein Wert.";
    }

    this.toHTML = function() {
        var display = '<a id="block_' + this.blockId + '" class="block" href="javascript:;" ' +
        'onclick="editExpression(getBlock(' + this.blockId + '));">Wert</a> ';
        return display;
    }

    this.toLatex = function() {
        return "?";
    }
}
Value.prototype = new Block;