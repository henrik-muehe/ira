function Relation() {
    this.kind = Relation;

    // returns contents of this relation object
    this.getResult = function() {
        return [];
    }

    this.getName = function() {
        return "";
    }
    this.setName = null;

    this.getColumns = function() {
        return [];
    }
    this.setColumns = null;

    this.copy = function() {
        return new Relation();
    }

    this.toJS = function() {
        throw "Der Ausdruck ist nicht vollständig definiert, es fehlt eine Relation.";
    }

    this.toHTML = function() {
        return '<a id="block_' + this.blockId + '" class="block" href="javascript:;" onclick="editExpression(getBlock(' + this.blockId + '));">Ausdruck</a>';
    }

    this.toLatex = function() {
        return "\\emptyset";
    }
}
Relation.prototype = new Block;