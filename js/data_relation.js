function DataRelation(name, columns, data) {
    this.name = name;
    this.columns = columns;
    this.data = data;

    this.copy = function() {
        return new DataRelation(name, columns, data);
    }

    this.getName = function() {
        return this.name;
    }
    this.setName = null;

    this.getColumns = function() {
        return this.columns;
    }
    this.setColumns = null;

    this.getResult = function() {
        return this.data;
    }

    this.toHTML = function() {
        return latex(this.name);
    }

    this.toLatex = function() {
        return this.name;
    }
}
DataRelation.prototype = new Relation;