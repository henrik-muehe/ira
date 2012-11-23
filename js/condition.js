function Condition() {
    this.kind = Condition;
    this.setChildren([]);
    
    this.copy = function() {
        return new Condition();
    }

    this.toJS = function() {
        return true;
    }

    this.toHTML = function() {
        var display = '<a id="block_' + this.blockId + '" class="block" href="javascript:;" ' +
        'onclick="editExpression(getBlock(' + this.blockId + '));">Bedingung</a> ';
        return display;
    }

    this.toLatex = function() {
        return "true";
    }
}
Condition.prototype = new Block;