function ValueColumn(col) {
    this.kind = ValueColumn;
    this.column = col;

    this.copy = function() {
        return new ValueColumn(col);
    }

    this.toJS = function() {
        return "currentRow." + this.column.gsub(".", "___");
        // currentRow needs to be filled before this is eval'd
    }

    this.toHTML = function() {
        return this.column;
    }

    this.toLatex = function() {
        return '\\textrm{' + this.column.gsub("_", "\\_") + '}';
    }
}
ValueColumn.prototype = new Value;