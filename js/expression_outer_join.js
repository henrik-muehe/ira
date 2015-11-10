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
function OuterJoin(input1, input2) {
    var symbol = "\\hspace{1ex}{\\mathrel{\\stackrel{\\rule[0.52ex]{0.50ex}{0.10ex}}{\\rule[0ex]{0.50ex}{0.10ex}}\\hspace{-0.75ex}\\mathord{\\bowtie}\\hspace{-0.1ex}{\\mathrel{\\stackrel{\\rule[0.52ex]{0.50ex}{0.10ex}}{\\rule[0ex]{0.50ex}{0.10ex}}\\hspace{-0.7ex}}}}}\\hspace{1ex} ";
    this.setChildren([input1, input2]);

    this.base = Join;
    this.base(input1, input2);

    this.leftOuter = true;
    this.rightOuter = true;

    this.copy = function() {
        return new OuterJoin(this.input1.copy(), this.input2.copy());
    }

    this.toHTML = function(options) {
        var display = '';
        display += '(' + this.getInput1().toHTML(options) + ") " + latex(symbol) + " (" + this.getInput2().toHTML(options) + ")";
        return display;
    }

    this.toLatex = function(options) {
        return "(" + this.getInput1().toLatex(options) + symbol + this.getInput2().toLatex(options) + ")";
    }
}
OuterJoin.prototype = new Join;
