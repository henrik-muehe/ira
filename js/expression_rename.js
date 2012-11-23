function Rename(renames, input) {
    this.setChildren([input]);

    this.renames = renames;
    this.input = input;

    this.getName = function() {
        if (!renames.match("<-")) {
            // rename relation
            return renames;
        } else {
            // return old name
            return this.input.getName();
        }
    }
    this.setName = null;

    this.getColumns = function() {
        var cols = this.input.getColumns();
        var pcols = this.renames.split(",");

        if (renames.match("<-")) {
            var r = new Hash();

            // figure out renames
            pcols.each(function(c) {
                var parts = c.split("<-");
                r.set(parts[1], parts[0]);
            });

            // rename columns
            var newcols = [];
            cols.each(function(c) {
                if (r.get(c)) {
                    newcols.push(r.get(c));
                } else {
                    newcols.push(c);
                }
            });
            return newcols;
        } else {
            return this.input.getColumns();
        }
    }
    this.setColumns = null;

    this.getResult = function() {
        return input.getResult();

    }

    this.copy = function() {
        return new Rename(renames, this.input.copy());
    }

    this.toHTML = function() {
        var display = '(';
        display += latex("\\rho");
        display += '<span style=\'font-size:10pt; vertical-align: bottom\'>' + renames + "</span> " + this.input.toHTML() + ")";
        return display;
    }


    this.toLatex = function() {
        var lcol = renames.gsub("<-", '\\leftarrow ')
        return "\\rho_{" + lcol + "}" + input.toLatex();
    }
}
Rename.prototype = new Relation();