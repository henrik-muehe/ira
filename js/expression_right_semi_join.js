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
function RightSemiJoin(input1, input2) {
    this.input1 = input1;
    this.input2 = input2;

    this.setChildren([this.input1, this.input2]);

    this.getName = function() {
        return this.input1.getName() + "_" + this.input2.getName();
    }
    this.setName = null;

    this.getColumns = function() {
        return this.input2.getColumns();
    }
    this.setColumns = null;

    this.getResult = function() {
        var r = new Projection(this.input2.getColumns().join(","), new Join(this.input1, this.input2));
        return r.getResult();
    }

    this.copy = function() {
        return new RightSemiJoin(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.input1.toHTML() + " " + latex("\\rtimes") + " " + this.input2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.input1.toLatex() + "\\rtimes " + this.input2.toLatex() + ")";
    }
}
RightSemiJoin.prototype = new Relation;