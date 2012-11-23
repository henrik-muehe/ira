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
function ConditionAnd(cond1, cond2) {
    this.cond1 = cond1;
    this.cond2 = cond2;

    this.setChildren([cond1, cond2]);

    this.copy = function() {
        return new ConditionAnd(this.cond1.copy(), this.cond2.copy());
    }

    this.toJS = function() {
        if (this.cond1.toJS() == null || this.cond2.toJS() == null) return null;
        return this.cond1.toJS() + " && " + this.cond2.toJS();
    }

    this.toHTML = function() {
        var display = '(';
        display += this.cond1.toHTML() + latex('\\wedge') + this.cond2.toHTML() + ")";
        return display;
    }

    this.toLatex = function() {
        return '(' + this.cond1.toLatex() + '\\wedge ' + this.cond2.toLatex() + ')';
    }
}
ConditionAnd.prototype = new Condition;