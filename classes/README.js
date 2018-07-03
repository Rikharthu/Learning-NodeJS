class Foo {
	constructor() {
		this.x = 2;
		this.y = 4;
	}

	bar() {
		// ...
	}

	baz() {
		// ...
	}
}

//Is roughly the same as:

function Foo() {
	this.x = 2;
	this.y = 4;

	this.bar = function() {
		// ...
	};
	this.baz = function() {
		// ...
	};
}
