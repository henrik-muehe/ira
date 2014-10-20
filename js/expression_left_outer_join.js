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
function LeftOuterJoin(input1, input2) {
    //var symbol = "\\hspace{1ex}{\\mathrel{\\stackrel{\\rule[0.52ex]{0.50ex}{0.10ex}}{\\rule[0ex]{0.50ex}{0.10ex}}\\hspace{-0.75ex}\\mathord{\\bowtie}\\hspace{1ex} ";
	var symbol = "\\unicode{x27d5}";
    this.setChildren([input1, input2]);

    this.base = Join;
    this.base(input1, input2);

    this.leftOuter = true;
    this.rightOuter = false;

    this.copy = function() {
        return new LeftOuterJoin(this.getInput1().copy(), this.getInput1().copy());
    }

    this.toHTML = function() {
        var display = '';
        display += '(' + this.getInput1().toHTML() + " " + latex(symbol) + " " + this.getInput2().toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return "(" + this.getInput1().toLatex() + symbol + this.getInput2().toLatex() + ")";
    }
}
LeftOuterJoin.prototype = new Join;
