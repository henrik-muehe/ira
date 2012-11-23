function Block() {
    this.kind = Block;

    this.children = [];
    this.getChildren = function() {
        return this.children;
    }

    this.setChildren = function(c) {
        this.children = c;
    }

    this.copy = function() {
        throw "Kann abstrakte Klasse Block nicht kopieren.";
    }
    
    this.resetBlockIds = function() {
        if (!this.blockId) {
            this.blockId = ++blockid;
            this.getChildren().each(function(c) {
                c.resetBlockIds();
            });
        }
    }

    this.findChild = function(id) {
        if (this.blockId == id) {
            return this;
        } else {
            var result = null;
            this.getChildren().each(function(c) {
                var f = c.findChild(id);
                if (f != null) {
                    result = f;
                }
            });
            return result;
        }
    }
}