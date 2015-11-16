/*
IRA - Interactive Relational Algebra Tool
Copyright (C) 2010-2012 Henrik Mühe

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
function Join(input1, input2) {
    this.leftOuter = false;
    this.rightOuter = false;

    this.input1 = input1;
    this.input2 = input2;

    this.setChildren([this.input1, this.input2]);

    this.getInput1 = function() {
        return this.input1;
    }

    this.getInput2 = function() {
        return this.input2;
    }

    this.getName = function() {
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.moo = function() {
        alert('moo');
    }

    this.getColumns = function() {
        var columns = this.input1.getColumns().clone();
        this.input2.getColumns().each(function(c) {
            if (columns.indexOf(c) < 0) {
                columns.push(c)
            }
        });
        return columns;
    }
    this.setColumns = null;

    this.getResult = function() {
        var rel1 = this.input1.getResult()
        var rel2 = this.input2.getResult()
        var col1 = this.input1.getColumns();
        var col2 = this.input2.getColumns();
        var result = [];

        // find natural join columns
        var joincolumns = [];
        col1.each(function(c1) {
            col2.each(function(c2) {
                if (c1 == c2) {
                    joincolumns.push(c1);
                }
            });
        });

        // build result
        var rights_added = new Hash();
        var left_outer = this.leftOuter;
        rel1.each(function(row1) {
            var left_added = false;
            rel2.each(function(row2, nr) {
                var good = true;
                joincolumns.each(function(c) {
                    if (row1[col1.indexOf(c)] != row2[col2.indexOf(c)]) {
                        good = false;
                    }
                });

                if (good) {
                    var newrow = row1.clone();
                    col2.each(function(c, nr) {
                        if (joincolumns.indexOf(c) < 0) {
                            newrow.push(row2[nr])
                        }
                    });
                    result.push(newrow);

                    rights_added.set(nr, true)
                    left_added = true;
                }
            });

            // left outer join addon
            if (left_outer && !left_added) {
                var newrow = row1.clone();
                for (i = 0; i < col2.length - joincolumns.length; i++) {
                    newrow.push(null);
                }
                result.push(newrow);
            }
        });

        // right outer join addon
		var columns = this.getColumns();
        if (this.rightOuter) {
            rel2.each(function(row2, nr) {
                if (!rights_added.get(nr)) {
                    var newrow = [];
					// add left-hand columns
					for (i = 0; i < col1.length; i++) {
						if (joincolumns.indexOf(col1[i]) < 0) {
                            newrow.push(null);
                        } else {
							newrow.push(row2[col2.indexOf(col1[i])]);
						}
                    }
					// add right-hand columns
					for (i = 0; i < col2.length; i++) {
						console.log(col2[i] + " " + joincolumns.indexOf(col2[i]));
						if (joincolumns.indexOf(col2[i]) < 0) {
							newrow.push(row2[i]);
                        } else {
							// already added
						}
                    }
                    /*for (i = 0; i < col1.length - joincolumns.length; i++) {
                        newrow.unshift(null);
                    }*/
                    result.push(newrow);
                }
            });
        }

        return result;
    }

    this.copy = function() {
        return new Join(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function(options) {
        var display = '';
        display += '(' + this.input1.toHTML(options) + " " + latex("\\bowtie") + " " + this.input2.toHTML(options) + ")";
        return display;
    }

    this.toLatex = function(options) {
        return "(" + this.input1.toLatex(options) + "\\bowtie " + this.input2.toLatex(options) + ")";
    }
}
Join.prototype = new Relation();
